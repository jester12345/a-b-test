class ABTest {
    /**
     * Initiate the ABTest class.
     */
    constructor() {
        // Initialize the button click events
        let button = document.getElementById('price_button');

        if( button ) {
            /**
             * Add the onClick event listener to the button.
             * Be sure to bind the correct context of "this",
             * otherwise "this" becomes the button.
             */
            button.addEventListener('click', this.openModal.bind(this), false);
        } else {
            console.error('Price quote button is missing.');
        }

        // Initialize the modal overlay
        this.overlay = document.getElementById('overlay');

        if( this.overlay ) {
            /**
             * Add the onClick event listener to the overlay. This
             * allows the user to dismiss the overly by clicking on it.
             * Be sure to bind the correct context of "this",
             * otherwise "this" becomes the overlay.
             */
            this.overlay.addEventListener('click', this.closeModal.bind(this), false);
        } else {
            console.error('Modal overlay is missing.');
        }

        // Initialize the modal
        this.modal = document.getElementById('modal');

        if( this.modal ) {
            this.initModal();
        } else {
            console.error('Modal is missing.');
        }
    }

    

    /**
     * Initialize the modal so it works like we want.
     */
    initModal() {
        // Capture clicks inside the modal
        this.modal.addEventListener('click', function(e) {
            e.stopPropagation();
        }, false);

        /**
         * Add the onSubmit event listener to the form
         * so we are able to submit via ajax
         * Be sure to bind the correct context of "this",
         * otherwise "this" becomes the form.
         */
        this.modalForm = document.getElementById('price_quote_form');
        this.modalForm.addEventListener('submit', this.submitPriceForm.bind(this), false);

        // Set up the form error messages
        this.setupFormErrorMessages();

        // Initialize the image in the modal
        this.modalImage();

        // Initialize the close button
        this.modalCloseButton();
        
        // Init the State select menu
        this.setStateOptions();

        // Input event on name field
        this.customInputEvent();
    }

    /**
     * Create the error labels for the form. By creating them
     * programatically we are able to keep their style and
     * behavior consistent.
     */
    setupFormErrorMessages() {
        /**
         * Loop over the form and find the fields we care about.
         * We're only setting required here, but we could add other
         * conditions to check for as well, such as the type of input.
         */
        let required, label, placeholder, id, elem;
        for( let me in this.modalForm.elements ) {
            elem = this.modalForm.elements[me];

            // Skip the duplicates that Chrome adds, and only operate on real form elements
            if( me.indexOf('price_quote') !== 0 && elem && elem.tagName ) {
                required = elem.getAttribute('required');
                
                if( required !== null ) {
                    // This field is required
                    elem.dataset.validate = true;
                    placeholder = elem.getAttribute('placeholder');
                    id          = elem.getAttribute('id');

                    // Build the error label
                    label = document.createElement('label');
                    label.setAttribute('for', id);
                    label.setAttribute('id', 'for_' + id);
                    label.classList.add('error');
                    label.innerHTML = 'Please fill in your ' + placeholder + '.';

                    // User insertBefore to insert after
                    if ( elem.parentNode ) {
                        elem.parentNode.insertBefore( label, elem.nextSibling );
                    }
                }
            }
        }
    }

    /**
     * Make sure a variant is set. If so, return it. If not, generate it and then return it.
     * @return {int}    The variant the current user is using.
     */
    getVariant() {
        let variant = false;
        try {
            variant = localStorage.getItem('variant'); // Local storage stores everything as strings\
        } catch (e) {
            // The browser is blocking local storage, we'll have to get a new one.
            // Server-side storage would be more robust.
        }
        if( !variant ) {
            // variant is not set
            variant = Math.floor(Math.random() * 2) + 1;
            try {
                localStorage.setItem('variant', variant);
            } catch(e) {
                // The browser is blocking local storage, so this user may get a differet modal next time.
            }
        } else {
            // Local storage stores as a string, so we need to parse back to an it.
            variant = parseInt(variant, 10);
        }

        return variant;
    }

    /**
     * Initialize the modal image based on the variant the current user should see.
     */
    modalImage() {
        // Get the variant to show this user
        let variant = this.getVariant();

        let imgSrc = false;
        if( variant === 1 ) {
            // Image 1
            imgSrc = 'img/without-check.jpg';
        } else if ( variant === 2 ) {
            // Image 2
            imgSrc = 'img/with-check.jpg';
        } else {
            console.error("Unsupported variant :", variant);
        }

        if( imgSrc ) {
            let priceQuoteImg = document.getElementById('price_quote_image');

            if( priceQuoteImg ) {
                priceQuoteImg.src = imgSrc;
                priceQuoteImg.classList.add('show');
            } else {
                console.error('Modal price quote image is missing.');
            }
        }
    }

    /**
     * Initialize the modal close button.
     */
    modalCloseButton() {
        let button = document.getElementById('close_button');

        if( button ) {
            /**
             * Add the closeModal event listener to the button.
             * Be sure to bind the correct context of "this",
             * otherwise "this" becomes the button.
             */
            button.addEventListener('click', this.closeModal.bind(this), false);
        } else {
            console.error('Modal close button is missing.');
        }
    }

    /**
     * Set up the state select menu.
     */
    setStateOptions() {
        // Courtesy of: https://gist.github.com/mshafrir/2646763
        const statesList = {
            "AL": "Alabama",
            "AK": "Alaska",
            "AS": "American Samoa",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "DC": "District Of Columbia",
            "FM": "Federated States Of Micronesia",
            "FL": "Florida",
            "GA": "Georgia",
            "GU": "Guam",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MH": "Marshall Islands",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "MP": "Northern Mariana Islands",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PW": "Palau",
            "PA": "Pennsylvania",
            "PR": "Puerto Rico",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VI": "Virgin Islands",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming"
        };

        this.priceQuoteState = document.getElementById('price_quote_state');

        // Build the options for the select menu
        let option;
        for( let s in statesList ) {
            option              = document.createElement('option');
            option.value        = s;
            option.innerHTML    = statesList[s];
            this.priceQuoteState.appendChild(option);
        }

        /**
         * Add the onChange event listener to the state field
         * so that we can change the style to match the placeholders
         * based on the user having made a selection or not.
         * Be sure to bind the correct context of "this",
         * otherwise "this" becomes the state select element.
         */
        this.priceQuoteState.addEventListener('change', function(e) {
            if( this.priceQuoteState.selectedIndex > 0 ) {
                // The user has made a selection
                this.priceQuoteState.classList.remove('placeholder');
            } else {
                // No selection yet (selectedIndex is 0, which is the placeholder option)
                this.priceQuoteState.classList.add('placeholder');
            }
        }.bind(this), false);
    }

    /**
     * Init the custom input event on name field.
     * Be sure to bind the correct context of "this",
     * otherwise "this" becomes the name field.
     */
    customInputEvent() {
        this.priceQuoteName = document.getElementById('price_quote_name');
        this.priceQuoteName.addEventListener('input', function(e) {
            console.log("Name Field Value:", this.priceQuoteName.value);
        }.bind(this), false);
    }

    /**
     * Open the modal.
     * @param   {obj} e   The event object
     */
    openModal(e) {
        e.stopPropagation();

        // Hide the success message
        document.getElementById('quote_message').classList.remove('show');

        // Set the session Id
        let sessionId = {
            session_id: new Date().getTime()
        };

        // Log the session ID object to the console
        console.log(sessionId);

        this.overlay.classList.add('show');
        this.modal.classList.add('show');
    }

    /**
     * Close the modal.
     * @param   {obj} e   The event object
     */
    closeModal(e) {
        e.stopPropagation();
        this.modal.classList.remove('show');
        this.overlay.classList.remove('show');
    }

    /**
     * Ajax action to submit the price quote form. Here we look for fields in error,
     * or log the data to the console and close the modal.
     * @param   {obj} e   The event object
     */
    submitPriceForm(e) {
        e.preventDefault();

        let numErrors   = 0;
        let data        = {
            variation: this.getVariant()
        };
        let required, filled, elem, type, id, forId;
        for( let me in this.modalForm.elements ) {
            elem = this.modalForm.elements[me];

            // Look for elements that we've added validation to:
            if( elem && elem.dataset && elem.dataset.validate ) {
                type        = elem.tagName.toLowerCase();
                id          = elem.getAttribute('id');
                forId       = 'for_' + elem.getAttribute('id'); // The label id... follows consistent pattern
                filled      = false; // Did the user enter something... assume not
                required    = elem.getAttribute('required') !== null;

                if( required ) {
                    // Check to see if the required field has been filled
                    if( type === 'input' ) {
                        filled = elem.value.length > 0;
                    } else if( type === 'select' ) {
                        filled = elem.selectedIndex > 0;
                    }
                }

                if( required && !filled ) {
                    // Field is required and it's empty
                    // Increment the error count
                    numErrors++;

                    // Show the error
                    document.getElementById( 'for_' + elem.getAttribute('id') ).classList.add('show');

                    // If it's the first error, then we'll want to focus the user on it
                    if( numErrors === 1 ) {
                        elem.focus();
                    }
                } else {
                    // Hide the error, in case it's showing
                    document.getElementById( 'for_' + elem.getAttribute('id') ).classList.remove('show');

                    // Add it to the JSON object
                    data[ elem.name ] = elem.value;
                }
            }
        }

        if( numErrors === 0 ) {
            // Do the submit
            
            // Log the data
            console.log(data);

            // Show the success message
            document.getElementById('quote_message').classList.add('show');
            
            // Close the modal
            this.closeModal(e);
        }
    }
    
}