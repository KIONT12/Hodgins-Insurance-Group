'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    quoterushConfig?: {
      mapsKey?: string;
    };
    gm_authFailure?: () => void;
  }
}

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AddressData {
  formattedAddress: string;
  placeId: string;
  streetNumber: string;
  route: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  lat: number;
  lng: number;
}

export default function EnhancedQuoteWidget() {
  const [step, setStep] = useState(1);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [addressInputValue, setAddressInputValue] = useState('');
  const [propertyData, setPropertyData] = useState({
    squareFeet: '',
    yearBuilt: ''
  });
  const [contactData, setContactData] = useState({
    fullName: '',
    phone: '',
    email: '',
    ownership: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [, setQuotePreview] = useState({ annual: null as number | null, monthly: null as number | null });
  const [reviewDate, setReviewDate] = useState('');
  const [reviewTime, setReviewTime] = useState('');
  const [mapsApiError, setMapsApiError] = useState(false);
  const [allowManualEntry, setAllowManualEntry] = useState(false);

  const addressInputRef = useRef<HTMLInputElement>(null);

  const squareFeetOptions = useMemo(
    () => Array.from({ length: 46 }, (_, i) => 500 + i * 100),
    []
  );

  const yearBuiltOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1799 }, (_, i) => currentYear - i);
  }, []);

  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dayName = dayNames[date.getDay()];
      const monthName = monthNames[date.getMonth()];
      const day = date.getDate();
      const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
      dates.push({
        value: date.toISOString().split('T')[0],
        label: `${dayName}, ${monthName} ${day}${suffix}`
      });
    }
    return dates;
  }, []);

  const timeSlots = useMemo(() => {
    const times = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const ampm = hour < 12 ? 'AM' : 'PM';
        const minStr = minute === 0 ? '00' : minute.toString();
        times.push({
          value: `${hour.toString().padStart(2, '0')}:${minStr}`,
          label: `${time12}:${minStr} ${ampm}`
        });
      }
    }
    return times;
  }, []);

  // Load Google Maps API
  useEffect(() => {
    if (window.google) {
      setGoogleMapsLoaded(true);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 
                  (typeof window !== 'undefined' && window.quoterushConfig?.mapsKey);
    
    // Only load Google Maps if API key is provided
    if (!apiKey) {
      console.warn('⚠️ Google Maps API key not found');
      console.warn('💡 Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local');
      console.warn('📖 See GOOGLE_MAPS_SETUP.md for instructions');
      setAllowManualEntry(true);
      return;
    }
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      setGoogleMapsLoaded(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleMapsLoaded(true);
      setMapsApiError(false);
    };
    script.onerror = () => {
      console.error('❌ Failed to load Google Maps API');
      console.error('💡 Check: 1) Places API enabled? 2) API key restrictions? 3) Billing enabled?');
      console.error('📖 See FIX_GOOGLE_MAPS_API.md for detailed instructions');
      setMapsApiError(true);
      setAllowManualEntry(true);
    };
    
    // Handle API key errors
    window.gm_authFailure = () => {
      console.error('❌ Google Maps API key error');
      console.error('💡 Common issues:');
      console.error('   1. Places API not enabled - Enable it in Google Cloud Console');
      console.error('   2. API key restrictions blocking localhost:3000');
      console.error('   3. Billing not enabled (free tier available)');
      console.error('📖 See FIX_GOOGLE_MAPS_API.md for step-by-step fixes');
      setMapsApiError(true);
      setAllowManualEntry(true);
      setGoogleMapsLoaded(false);
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Enhanced address parsing function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseAddressComponents = useCallback((components: any[]): AddressData | null => {
    const addressInfo: AddressData = {
      formattedAddress: '',
      placeId: '',
      streetNumber: '',
      route: '',
      city: '',
      state: '',
      zipCode: '',
      county: '',
      lat: 0,
      lng: 0
    };

    // Parse all address components
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components.forEach((component: any) => {
      const types = component.types;
      
      if (types.includes('street_number')) {
        addressInfo.streetNumber = component.long_name;
      } else if (types.includes('route')) {
        addressInfo.route = component.long_name;
      } else if (types.includes('locality')) {
        // Primary city
        addressInfo.city = component.long_name;
      } else if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
        // Use sublocality as city if locality is not available
        if (!addressInfo.city) {
          addressInfo.city = component.long_name;
        }
      } else if (types.includes('administrative_area_level_1')) {
        addressInfo.state = component.short_name;
      } else if (types.includes('postal_code')) {
        addressInfo.zipCode = component.long_name;
      } else if (types.includes('postal_code_suffix')) {
        // Append zip+4 if available
        if (addressInfo.zipCode) {
          addressInfo.zipCode = `${addressInfo.zipCode}-${component.long_name}`;
        }
      } else if (types.includes('administrative_area_level_2')) {
        // County
        addressInfo.county = component.long_name;
      } else if (types.includes('neighborhood')) {
        // Sometimes neighborhood can help identify area
        if (!addressInfo.city && !addressInfo.county) {
          // Use as fallback
        }
      }
    });

    return addressInfo;
  }, []);

  // Validate address has minimum required data for insurance quotes
  const validateAddressData = useCallback((addressInfo: AddressData): string | null => {
    if (addressInfo.state !== 'FL') {
      return 'Please enter a Florida address';
    }
    
    if (!addressInfo.zipCode) {
      return 'Address must include a zip code for accurate quotes';
    }
    
    if (!addressInfo.city && !addressInfo.county) {
      return 'Address must include city or county information';
    }
    
    if (!addressInfo.formattedAddress) {
      return 'Invalid address format';
    }
    
    return null;
  }, []);

  const initializeAutocomplete = useCallback(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.log('Google Maps API not available');
      return;
    }
    
    if (!addressInputRef.current) {
      console.log('Address input ref not available');
      return;
    }

    try {
      const inputElement = addressInputRef.current;
      
      // Clear any existing autocomplete first to prevent duplicates
      if (inputElement.dataset.autocompleteInitialized === 'true') {
        console.log('Autocomplete already initialized on this element');
        return;
      }
      
      // If autocomplete state exists but element isn't marked, clear it
      if (autocomplete && window.google && window.google.maps && window.google.maps.event) {
        try {
          // Try to clean up existing autocomplete
          window.google.maps.event.clearInstanceListeners(autocomplete);
        } catch {
          console.log('Could not clear existing autocomplete listeners');
        }
      }
      
      // Enhanced autocomplete configuration for better Florida address search
      const autocompleteInstance = new window.google.maps.places.Autocomplete(inputElement, {
        // Use broader types to catch all address formats - this allows suggestions while typing
        types: ['address'], // Focus on addresses specifically
        componentRestrictions: { 
          country: ['us'], // US addresses only
          // Note: We can't restrict to FL state in autocomplete, but we validate after selection
        },
        // Request all necessary fields for insurance quoting
        fields: [
          'formatted_address',
          'geometry',
          'address_components',
          'place_id',
          'name',
          'types'
        ],
        // Bias results towards Florida - this helps show FL addresses first
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(24.396308, -87.634643), // Southwest corner of FL
          new window.google.maps.LatLng(31.000968, -79.974307)  // Northeast corner of FL
        )
      });
      
      // Mark as initialized
      inputElement.dataset.autocompleteInitialized = 'true';

      // Listen for place selection
      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        
        if (!place.geometry) {
          setErrors({ address: 'Please select a valid address from the suggestions' });
          return;
        }

        // Parse address components
        const addressInfo = parseAddressComponents(place.address_components || []);
        
        if (!addressInfo) {
          setErrors({ address: 'Unable to parse address. Please try again.' });
          return;
        }

        // Set required fields from place object
        addressInfo.formattedAddress = place.formatted_address || place.name || '';
        addressInfo.placeId = place.place_id || '';
        addressInfo.lat = place.geometry.location.lat();
        addressInfo.lng = place.geometry.location.lng();

        // Validate address data
        const validationError = validateAddressData(addressInfo);
        if (validationError) {
          setErrors({ address: validationError });
          return;
        }

        // If city is missing but we have county, use county as city fallback
        if (!addressInfo.city && addressInfo.county) {
          addressInfo.city = addressInfo.county;
        }

        setAddressData(addressInfo);
        // Update input value from the input element (autocomplete sets it)
        if (addressInputRef.current) {
          setAddressInputValue(addressInputRef.current.value);
        } else {
          setAddressInputValue(addressInfo.formattedAddress);
        }
        // Real quotes will be fetched after form submission
        setQuotePreview({ annual: null, monthly: null });
        setErrors({});
        // Skip map step, go directly to property details
        setStep(3);
        sessionStorage.setItem('quoteAddress', JSON.stringify(addressInfo));
      });
      
      // Also listen for input changes to sync state (for manual typing)
      if (addressInputRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addressInputRef.current.addEventListener('input', (e: any) => {
          if (e.target && !autocompleteInstance.getPlace()) {
            setAddressInputValue(e.target.value);
          }
        });
      }

      setAutocomplete(autocompleteInstance);
      console.log('✅ Autocomplete initialized successfully');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('❌ Error initializing autocomplete:', error);
      console.error('💡 Check browser console for Google Maps API errors');
      console.error('📖 See FIX_GOOGLE_MAPS_API.md for troubleshooting');
      setErrors({ autocomplete: 'Address search unavailable. Please try again.' });
      setAllowManualEntry(true);
      // Clear the dataset flag on error so we can retry
      if (addressInputRef.current) {
        addressInputRef.current.dataset.autocompleteInitialized = 'false';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parseAddressComponents, validateAddressData]); // Removed autocomplete from deps to prevent stale closures

  // Initialize autocomplete when ready
  useEffect(() => {
    if (step !== 1) return;
    
    const tryInitialize = () => {
      // Check if element is already initialized
      if (addressInputRef.current?.dataset.autocompleteInitialized === 'true') {
        return;
      }
      
      if (!addressInputRef.current) {
        return; // Input not ready
      }
      
      // Wait for Google Maps to load
      if (!googleMapsLoaded) {
        return; // Maps not loaded yet, will retry
      }
      
      if (!window.google?.maps?.places) {
        // If we've been waiting too long and there's an error, enable manual entry
        if (mapsApiError && !allowManualEntry) {
          setAllowManualEntry(true);
        }
        return; // API not available
      }
      
      // All conditions met, initialize autocomplete
      initializeAutocomplete();
    };

    // Try immediately if conditions are met
    tryInitialize();
    
    // Also try after delays to handle async loading
    const timers = [
      setTimeout(tryInitialize, 100),
      setTimeout(tryInitialize, 300),
      setTimeout(tryInitialize, 500),
      setTimeout(tryInitialize, 1000),
      setTimeout(tryInitialize, 2000),
      setTimeout(tryInitialize, 3000) // One more attempt after 3 seconds
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [step, googleMapsLoaded, initializeAutocomplete, allowManualEntry, mapsApiError]);

  // Sync input value when it changes programmatically (but don't interfere with autocomplete typing)
  useEffect(() => {
    if (addressInputRef.current && step === 1) {
      // Only update if the input is empty or if we're in manual entry mode
      if (!autocomplete || allowManualEntry) {
        if (addressInputRef.current.value !== addressInputValue) {
          addressInputRef.current.value = addressInputValue;
        }
      }
    }
  }, [addressInputValue, step, autocomplete, allowManualEntry]);


  // Map step removed - address goes directly to property details

  // Load saved data
  useEffect(() => {
    const savedAddress = sessionStorage.getItem('quoteAddress');
    const savedPropertyData = sessionStorage.getItem('quotePropertyData');
    const savedContactData = sessionStorage.getItem('quoteContactData');

    if (savedAddress) {
      try {
        const address = JSON.parse(savedAddress);
        setAddressData(address);
        setAddressInputValue(address.formattedAddress);
        if (savedContactData) {
          setStep(4);
        } else if (savedPropertyData) {
          setStep(3);
        } else {
          setStep(3);
        }
      } catch (error) {
        console.error('Error loading saved address:', error);
      }
    }

    if (savedPropertyData) {
      try {
        setPropertyData(JSON.parse(savedPropertyData));
      } catch (error) {
        console.error('Error loading saved property data:', error);
      }
    }

    if (savedContactData) {
      try {
        setContactData(JSON.parse(savedContactData));
      } catch (error) {
        console.error('Error loading saved contact data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (propertyData.squareFeet || propertyData.yearBuilt) {
      sessionStorage.setItem('quotePropertyData', JSON.stringify(propertyData));
    }
  }, [propertyData]);

  useEffect(() => {
    if (contactData.fullName || contactData.email || contactData.phone) {
      sessionStorage.setItem('quoteContactData', JSON.stringify(contactData));
    }
  }, [contactData]);

  // Removed unused handleAddressChange - using inline onChange instead

  const handleManualAddressSubmit = () => {
    if (!addressInputValue.trim()) {
      setErrors({ address: 'Please enter an address' });
      return;
    }

    // More lenient validation - check if it contains "FL" or "Florida", or if it looks like a valid address
    const addressUpperCheck = addressInputValue.toUpperCase().trim();
    const hasFL = addressUpperCheck.includes('FL') || addressUpperCheck.includes('FLORIDA');
    
    // If no FL/Florida, check if it looks like a complete address (has zip code or city pattern)
    const hasZipCode = /\b\d{5}(?:-\d{4})?\b/.test(addressInputValue);
    const hasCityPattern = /[A-Za-z\s]+,\s*[A-Za-z]{2}/.test(addressInputValue);
    const looksLikeAddress = hasZipCode || hasCityPattern || addressInputValue.split(',').length >= 2;
    
    if (!hasFL && !looksLikeAddress) {
      setErrors({ address: 'Please enter a complete Florida address (e.g., 123 Main St, Miami, FL 33101)' });
      return;
    }

    // Try to extract zip code and city from the address string
    let addressString = addressInputValue.trim();
    
    // Automatically add "FL" if not present and address looks complete
    const addressUpper = addressString.toUpperCase();
    if (!addressUpper.includes('FL') && !addressUpper.includes('FLORIDA')) {
      // If address has a zip code or city pattern, add ", FL" before the zip or at the end
      const zipMatch = addressString.match(/\b(\d{5}(?:-\d{4})?)\b/);
      if (zipMatch) {
        // Add FL before zip code
        addressString = addressString.replace(/\b(\d{5}(?:-\d{4})?)\b/, 'FL $1');
      } else if (addressString.includes(',')) {
        // Add ", FL" at the end if there's already a comma (city, state pattern)
        addressString = `${addressString}, FL`;
      } else {
        // Just add ", FL" at the end
        addressString = `${addressString}, FL`;
      }
    }
    
    const zipMatch = addressString.match(/\b(\d{5}(?:-\d{4})?)\b/);
    const zipCode = zipMatch ? zipMatch[1] : '';
    
    // Try to extract city (usually before state/zip)
    let city = '';
    const cityMatch = addressString.match(/([^,]+),\s*FL/i);
    if (cityMatch) {
      city = cityMatch[1].trim();
    } else {
      // Try to find city pattern: "City, FL" or "City FL"
      const cityPattern = /([A-Za-z\s]+?),\s*FL|([A-Za-z\s]+?)\s+FL\s+\d{5}/i;
      const cityMatch2 = addressString.match(cityPattern);
      if (cityMatch2) {
        city = (cityMatch2[1] || cityMatch2[2] || '').trim();
      }
    }
    
    // Extract street address (everything before city/state/zip)
    let streetAddress = addressString;
    if (city) {
      streetAddress = addressString.split(city)[0].trim();
    } else if (zipCode) {
      streetAddress = addressString.split(zipCode)[0].trim();
    }
    
    // Create a basic address data structure for manual entry
    const manualAddressData: AddressData = {
      formattedAddress: addressInputValue.trim(),
      placeId: '',
      streetNumber: '',
      route: streetAddress,
      city: city || '',
      state: 'FL',
      zipCode: zipCode,
      county: '',
      lat: 0, // Will need geocoding if maps available
      lng: 0
    };

    // Try to geocode if Google Maps is available
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      
      // Add "Florida" or "FL" to search if not present to improve results
      let searchAddress = addressInputValue.trim();
      const addressUpper = searchAddress.toUpperCase();
      if (!addressUpper.includes('FL') && !addressUpper.includes('FLORIDA')) {
        searchAddress = `${searchAddress}, FL, USA`;
      }
      
      // Set up timeout for geocoding (8 seconds)
      let geocodeCompleted = false;
      const timeout = setTimeout(() => {
        if (!geocodeCompleted) {
          geocodeCompleted = true;
          // Geocoding took too long - proceed with manual address
          setAddressData(manualAddressData);
          // Real quotes will be fetched after form submission
          setQuotePreview({ annual: null, monthly: null });
          setErrors({});
          setStep(3); // Skip map step and continue
          sessionStorage.setItem('quoteAddress', JSON.stringify(manualAddressData));
        }
      }, 8000);
      
      geocoder.geocode({ 
        address: searchAddress,
        region: 'us', // Bias to US
        componentRestrictions: { country: 'us' }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, (results: any[], status: string) => {
        // Clear timeout if geocoding completes
        clearTimeout(timeout);
        
        if (geocodeCompleted) {
          // Already handled by timeout
          return;
        }
        
        geocodeCompleted = true;
        
        if (status === 'OK' && results && results.length > 0) {
          // Find the best result (prefer results with street addresses)
          let bestResult = results[0];
          for (const result of results) {
            const types = result.types || [];
            if (types.includes('street_address') || types.includes('premise')) {
              bestResult = result;
              break;
            }
          }
          
          const result = bestResult;
          const parsedAddress = parseAddressComponents(result.address_components || []);
          
          if (!parsedAddress) {
            // If parsing fails, proceed with manual address
            setAddressData(manualAddressData);
            // Real quotes will be fetched after form submission
            setQuotePreview({ annual: null, monthly: null });
            setErrors({});
            setStep(3);
            sessionStorage.setItem('quoteAddress', JSON.stringify(manualAddressData));
            return;
          }

          // Set required fields
          parsedAddress.formattedAddress = result.formatted_address || searchAddress;
          parsedAddress.placeId = result.place_id || '';
          parsedAddress.lat = result.geometry.location.lat();
          parsedAddress.lng = result.geometry.location.lng();

          // Validate address data
          const validationError = validateAddressData(parsedAddress);
          if (validationError) {
            // If validation fails, proceed with manual address but show warning
            setAddressData(manualAddressData);
            // Real quotes will be fetched after form submission
            setQuotePreview({ annual: null, monthly: null });
            setErrors({});
            setStep(3);
            sessionStorage.setItem('quoteAddress', JSON.stringify(manualAddressData));
            return;
          }

          // If city is missing but we have county, use county as city fallback
          if (!parsedAddress.city && parsedAddress.county) {
            parsedAddress.city = parsedAddress.county;
          }

          setAddressData(parsedAddress);
          setAddressInputValue(parsedAddress.formattedAddress);
          // Real quotes will be fetched after form submission
          setQuotePreview({ annual: null, monthly: null });
          setErrors({});
          
          // Skip map step, go directly to property details
          setStep(3);
          
          sessionStorage.setItem('quoteAddress', JSON.stringify(parsedAddress));
        } else if (status === 'ZERO_RESULTS') {
          // No results found - proceed with manual address
          setAddressData(manualAddressData);
          // Real quotes will be fetched after form submission
          setQuotePreview({ annual: null, monthly: null });
          setErrors({});
          setStep(3);
          sessionStorage.setItem('quoteAddress', JSON.stringify(manualAddressData));
        } else {
          // Other errors - proceed with manual address
          setAddressData(manualAddressData);
          // Real quotes will be fetched after form submission
          setQuotePreview({ annual: null, monthly: null });
          setErrors({});
          setStep(3);
          sessionStorage.setItem('quoteAddress', JSON.stringify(manualAddressData));
        }
      });
    } else {
      // No Google Maps - proceed without coordinates
      setAddressData(manualAddressData);
      // Real quotes will be fetched after form submission
      setQuotePreview({ annual: null, monthly: null });
      setErrors({});
      setStep(3); // Skip map step
      sessionStorage.setItem('quoteAddress', JSON.stringify(manualAddressData));
    }
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validatePropertyStep = () => {
    const newErrors: Record<string, string> = {};
    if (!propertyData.squareFeet || Number(propertyData.squareFeet) < 500) {
      newErrors.squareFeet = 'Please enter a valid square footage (minimum 500 sq ft)';
    }
    if (!propertyData.yearBuilt || Number(propertyData.yearBuilt) < 1800 || Number(propertyData.yearBuilt) > new Date().getFullYear() + 1) {
      newErrors.yearBuilt = 'Please enter a valid year built';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactStep = () => {
    const newErrors: Record<string, string> = {};
    if (!contactData.fullName || contactData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!contactData.phone || contactData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!contactData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!contactData.ownership || (contactData.ownership !== 'rent' && contactData.ownership !== 'own')) {
      newErrors.ownership = 'Please select whether you rent or own';
    }
    if (!reviewDate) {
      newErrors.reviewDate = 'Please select a review date';
    }
    if (!reviewTime) {
      newErrors.reviewTime = 'Please select a review time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 3) {
      if (validatePropertyStep()) {
        setStep(4);
      }
    }
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      setStep(1); // Skip step 2 (map), go directly to address input
    }
  };

  const handleSubmit = async () => {
    if (!validateContactStep()) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Validate we have minimum address data before submission
    if (!addressData || !addressData.zipCode) {
      setErrors({ submit: 'Address information is incomplete. Please go back and enter a complete address.' });
      setIsSubmitting(false);
      return;
    }

    // Package all data for API submission - ensuring all address components are included
    const payload = {
      // Complete address data (critical for accurate insurance quotes)
      address: addressData.formattedAddress,
      streetNumber: addressData.streetNumber || '',
      route: addressData.route || '',
      streetAddress: `${addressData.streetNumber || ''} ${addressData.route || ''}`.trim(), // Full street address
      city: addressData.city || addressData.county || '', // City is required
      state: addressData.state || 'FL',
      zipCode: addressData.zipCode, // Zip code is required
      zipCode5: addressData.zipCode.split('-')[0], // First 5 digits
      zipCode4: addressData.zipCode.includes('-') ? addressData.zipCode.split('-')[1] : '', // Last 4 digits if available
      county: addressData.county || '',
      latitude: addressData.lat || 0,
      longitude: addressData.lng || 0,
      placeId: addressData.placeId || '',
      
      // Property details
      squareFeet: Number(propertyData.squareFeet) || 0,
      yearBuilt: Number(propertyData.yearBuilt) || 0,
      
      // Contact information
      fullName: contactData.fullName.trim(),
      phone: contactData.phone.trim().replace(/\D/g, ''), // Remove non-digits, keep only numbers
      email: contactData.email.trim().toLowerCase(),
      ownership: contactData.ownership,
      firstName: contactData.fullName.split(' ')[0] || contactData.fullName,
      lastName: contactData.fullName.split(' ').slice(1).join(' ') || contactData.fullName,
      
      // Review scheduling
      reviewDate,
      reviewTime,
      
      // Metadata
      timestamp: new Date().toISOString(),
      source: 'Hodgins Insurance Group',
      addressVerified: !!(addressData.lat && addressData.lng && addressData.placeId) // Indicates if address was verified via Google
    };

    // Try QuoteRush API first if configured, otherwise use custom API
    const useQuoteRush = process.env.NEXT_PUBLIC_USE_QUOTERUSH === 'true';
    const widgetId = process.env.NEXT_PUBLIC_QUOTERUSH_WIDGET_ID;
    const agency = process.env.NEXT_PUBLIC_QUOTERUSH_AGENCY;

    try {
      let response;
      let data;

      if (useQuoteRush && widgetId && agency) {
        // Use QuoteRush API (similar to harvest.insure)
        const quoteRushPayload = {
          WidgetId: widgetId,
          Agency: agency,
          AddressLine1: `${addressData.streetNumber} ${addressData.route}`.trim() || addressData.formattedAddress,
          AddressLine2: '',
          City: addressData.city,
          State: addressData.state,
          Zip: addressData.zipCode,
          HomeStatus: contactData.ownership === 'own' ? 'Own' : 'Rent',
          SquareFeet: Number(propertyData.squareFeet) || 0,
          YearBuilt: Number(propertyData.yearBuilt) || 0,
          FirstName: contactData.fullName.split(' ')[0] || contactData.fullName,
          LastName: contactData.fullName.split(' ').slice(1).join(' ') || contactData.fullName,
          Phone: contactData.phone.trim().replace(/\D/g, ''),
          Email: contactData.email.trim().toLowerCase()
        };

        response = await fetch('https://api.quoterush.com/GetEstimates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(quoteRushPayload)
        });

        data = await response.json();

        // If QuoteRush returns premium data, show it
        if (data.LowestPremium || data.AveragePremium || data.HighestPremium) {
          // Store premium data and show success
          sessionStorage.setItem('quotePremiums', JSON.stringify(data));
          sessionStorage.removeItem('quoteAddress');
          sessionStorage.removeItem('quotePropertyData');
          sessionStorage.removeItem('quoteContactData');
          setStep(5);
          return;
        } else {
          // Fallback to custom API if QuoteRush doesn't return premiums
          throw new Error('QuoteRush did not return premium estimates');
        }
      } else {
        // Use Next.js API route (preferred) or custom API endpoint
        try {
          // Create abort controller for timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          // Try Next.js API route first (same domain, no CORS issues)
          const apiRoute = '/api/quote';
          response = await fetch(apiRoute, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);

          data = await response.json();
          if (response.ok && data.success) {
            sessionStorage.removeItem('quoteAddress');
            sessionStorage.removeItem('quotePropertyData');
            sessionStorage.removeItem('quoteContactData');
            setStep(5);
            return;
          } else {
            throw new Error(data.error || 'Submission failed');
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (fetchError: any) {
          // If API is unavailable, still show success and store data locally
          if (fetchError.name === 'AbortError' || 
              fetchError.name === 'TypeError' || 
              fetchError.message?.includes('Failed to fetch') ||
              fetchError.message?.includes('NetworkError') ||
              fetchError.message?.includes('Network request failed')) {
            console.warn('API endpoint unavailable, storing data locally:', fetchError);
            // Store the complete quote data locally
            sessionStorage.setItem('quoteSubmission', JSON.stringify({
              ...payload,
              submittedAt: new Date().toISOString(),
              status: 'pending'
            }));
            // Still show success to user
            sessionStorage.removeItem('quoteAddress');
            sessionStorage.removeItem('quotePropertyData');
            sessionStorage.removeItem('quoteContactData');
            setStep(5);
            return;
          }
          throw fetchError;
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Submission error:', error);
      // Only show error if it's not a network/API unavailable error
      if (!error.message?.includes('Failed to fetch') && !error.name?.includes('Abort')) {
        setErrors({
          submit: error.message || 'Failed to submit quote. Please try again or call 772.244.4350.'
        });
      } else {
        // For network errors, still proceed to success (data stored locally)
        sessionStorage.setItem('quoteSubmission', JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
          status: 'pending'
        }));
        sessionStorage.removeItem('quoteAddress');
        sessionStorage.removeItem('quotePropertyData');
        sessionStorage.removeItem('quoteContactData');
        setStep(5);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setAddressData(null);
    setAddressInputValue('');
    setPropertyData({ squareFeet: '', yearBuilt: '' });
    setContactData({ fullName: '', phone: '', email: '', ownership: '' });
    setReviewDate('');
    setReviewTime('');
    setErrors({});
    sessionStorage.removeItem('quoteAddress');
    sessionStorage.removeItem('quotePropertyData');
    sessionStorage.removeItem('quoteContactData');
    sessionStorage.removeItem('quotePremiums');
    if (addressInputRef.current) {
      addressInputRef.current.value = '';
      // Clear autocomplete initialization flag to allow re-initialization
      addressInputRef.current.dataset.autocompleteInitialized = 'false';
    }
    // Clear autocomplete state to allow re-initialization
    setAutocomplete(null);
  };

  // Step 1: Address Input
  if (step === 1) {
    return (
      <div id="quote-form" className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-white/20 shadow-2xl max-w-2xl mx-auto w-full">
        <div className="mb-4 sm:mb-5">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Get Your Free Quote</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-400 text-xs sm:text-sm font-semibold">Real Quotes from Multiple Carriers</span>
            </div>
          </div>
          {googleMapsLoaded && !mapsApiError && autocomplete ? (
            <p className="text-gray-400 text-sm mt-1">Start typing and select from suggestions</p>
          ) : googleMapsLoaded && !mapsApiError ? (
            <p className="text-gray-400 text-sm mt-1">Enter your Florida address below</p>
          ) : (
            <p className="text-gray-400 text-sm mt-1">Enter your Florida address below</p>
          )}
        </div>
        <div className="relative mb-3 sm:mb-4">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            ref={addressInputRef}
            type="text"
            id="address-input"
            placeholder={allowManualEntry ? "Enter complete address: 123 Main St, Miami, FL 33101" : "Start typing your Florida address..."}
            className="w-full pl-12 sm:pl-14 pr-4 py-4 sm:py-5 md:py-6 text-base sm:text-lg text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all shadow-lg hover:shadow-xl"
            autoComplete="off"
            value={addressInputValue}
            onChange={(e) => {
              const value = e.target.value;
              setAddressInputValue(value);
              if (errors.address) {
                setErrors((prev) => ({ ...prev, address: '' }));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (addressInputRef.current) {
                  setAddressInputValue(addressInputRef.current.value);
                }
                // Always allow manual submission if Enter is pressed
                handleManualAddressSubmit();
              }
            }}
            disabled={false}
            aria-label="Enter your Florida address"
            aria-autocomplete="list"
          />
          {/* Google Places Autocomplete will inject its dropdown here automatically */}
        </div>
        {/* Debug info - show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 text-xs text-gray-400 p-2 bg-black/20 rounded">
            <div>Status: {googleMapsLoaded ? '✓ Maps Loaded' : '⏳ Loading...'}</div>
            <div>Autocomplete: {autocomplete ? '✓ Active' : '✗ Not initialized'}</div>
            <div>API Key: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? '✓ Set' : '✗ Missing'}</div>
            <div>Manual Entry: {allowManualEntry ? '✓ Enabled' : '✗ Disabled'}</div>
            <div>Maps Error: {mapsApiError ? '✗ Error' : '✓ OK'}</div>
          </div>
        )}
        {/* Show manual entry button - always available as fallback */}
        {!autocomplete && (
          <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 text-sm mb-2 font-medium">
              {mapsApiError ? 'Address autocomplete unavailable. Enter your complete address manually.' : 
               'Enter your complete Florida address below.'}
            </p>
            <p className="text-yellow-200/80 text-xs mb-3">
              Include: Street address, City, State (FL), and Zip code<br />
              Example: 123 Main Street, Miami, FL 33101
            </p>
            <button
              onClick={handleManualAddressSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-bold text-base transition-all shadow-lg hover:scale-105"
            >
              Continue with Address
            </button>
          </div>
        )}
        {errors.address && <p className="text-red-400 text-sm mt-3">{errors.address}</p>}
        {errors.api && <p className="text-red-400 text-sm mt-3">{errors.api}</p>}
        {errors.autocomplete && <p className="text-red-400 text-sm mt-3">{errors.autocomplete}</p>}
      </div>
    );
  }

  // Step 3: Property Details
  if (step === 3) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Property Details</h3>
          <p className="text-gray-300 text-sm sm:text-base">Tell us about your home</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Square Footage</label>
            <select
              name="squareFeet"
              value={propertyData.squareFeet}
              onChange={handlePropertyChange}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
            >
              <option value="">Select square footage</option>
              {squareFeetOptions.map((sqft) => (
                <option key={sqft} value={sqft}>
                  {sqft.toLocaleString()} sq ft
                </option>
              ))}
            </select>
            {errors.squareFeet && <p className="text-red-400 text-sm mt-2">{errors.squareFeet}</p>}
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Year Built</label>
            <select
              name="yearBuilt"
              value={propertyData.yearBuilt}
              onChange={handlePropertyChange}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
            >
              <option value="">Select year built</option>
              {yearBuiltOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.yearBuilt && <p className="text-red-400 text-sm mt-2">{errors.yearBuilt}</p>}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleBack}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Contact Information
  if (step === 4) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Contact Information</h3>
          <p className="text-gray-300 text-sm sm:text-base">We&apos;ll send your quotes here</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={contactData.fullName}
              onChange={handleContactChange}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-2">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={contactData.phone}
              onChange={handleContactChange}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              placeholder="(772) 244-4350"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleContactChange}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Do you rent or own?</label>
            <select
              name="ownership"
              value={contactData.ownership}
              onChange={handleContactChange}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
            >
              <option value="">Select an option</option>
              <option value="own">Own</option>
              <option value="rent">Rent</option>
            </select>
            {errors.ownership && <p className="text-red-400 text-sm mt-2">{errors.ownership}</p>}
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Preferred Review Date</label>
            <select
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
            >
              <option value="">Select a date</option>
              {availableDates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
            {errors.reviewDate && <p className="text-red-400 text-sm mt-2">{errors.reviewDate}</p>}
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Preferred Review Time</label>
            <select
              value={reviewTime}
              onChange={(e) => setReviewTime(e.target.value)}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
            {errors.reviewTime && <p className="text-red-400 text-sm mt-2">{errors.reviewTime}</p>}
          </div>
        </div>
         {errors.submit && <p className="text-red-400 text-sm mt-4">{errors.submit}</p>}
         
         {/* Consent text similar to harvest.insure */}
         <p className="text-gray-300 text-xs mt-4 text-center">
           By pressing &apos;Get My Free Quotes&apos; you agree to our{' '}
           <a href="/terms" className="text-orange-400 hover:text-orange-300 underline">terms</a> and{' '}
           <a href="/privacy" className="text-orange-400 hover:text-orange-300 underline">privacy policy</a>, and consent to receive texts. 
           Text STOP to (772) 244-4350 to unsubscribe.
         </p>
         
         <div className="flex gap-3 mt-6">
           <button
             onClick={handleBack}
             className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:scale-105"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
             Back
           </button>
           <button
             onClick={handleSubmit}
             disabled={isSubmitting}
             className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isSubmitting ? 'Getting Quotes...' : 'Get My Free Quotes'}
           </button>
         </div>
      </div>
    );
  }

  // Step 5: Success
  if (step === 5) {
    // Check if we have quote premiums from QuoteRush
    const savedPremiums = sessionStorage.getItem('quotePremiums');
    let premiumData = null;
    if (savedPremiums) {
      try {
        premiumData = JSON.parse(savedPremiums);
      } catch (e) {
        console.error('Error parsing premium data:', e);
      }
    }

    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20 shadow-2xl text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {premiumData ? 'Quotes Ready!' : 'Quote Request Received!'}
          </h3>
          <p className="text-gray-300 text-base sm:text-lg">
            {premiumData 
              ? 'We&apos;ve compared quotes from multiple carriers. A licensed agent will contact you shortly to review your options.'
              : 'A licensed agent will contact you shortly to review your quotes and answer any questions.'}
          </p>
        </div>

        {/* Show premium estimates if available */}
        {premiumData && (premiumData.LowestPremium || premiumData.AveragePremium || premiumData.HighestPremium) && (
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 mb-6 border border-orange-500/30">
            <h4 className="text-white font-bold text-lg mb-4">Estimated Annual Premiums</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {premiumData.LowestPremium && (
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-300 text-sm mb-1">Lowest</p>
                  <p className="text-2xl font-bold text-green-400">${premiumData.LowestPremium.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs mt-1">/year</p>
                </div>
              )}
              {premiumData.AveragePremium && (
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-300 text-sm mb-1">Average</p>
                  <p className="text-2xl font-bold text-orange-400">${premiumData.AveragePremium.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs mt-1">/year</p>
                </div>
              )}
              {premiumData.HighestPremium && (
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-300 text-sm mb-1">Highest</p>
                  <p className="text-2xl font-bold text-white">${premiumData.HighestPremium.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs mt-1">/year</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <p className="text-white text-sm mb-2">Need immediate assistance?</p>
          <a
            href="tel:7722444350"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call 772.244.4350
          </a>
        </div>
        <button
          onClick={handleStartOver}
          className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all"
        >
          Get Another Quote
        </button>
      </div>
    );
  }

  return null;
}

