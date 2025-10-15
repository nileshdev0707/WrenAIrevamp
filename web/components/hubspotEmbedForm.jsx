import Script from 'next/script';
import React, { useState, useEffect } from 'react';

export const HubspotEmbedForm = ({ formId, onLoad, hideClass = false }) => {
    const [loaded, setLoaded] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // Check if HubSpot script is already loaded globally
        if (window.hbspt && window.hbspt.forms) {
            setScriptLoaded(true);
            setLoaded(true);
        }
    }, []);

    const handleScriptLoad = () => {
        setScriptLoaded(true);
        setLoaded(true);
        onLoad && onLoad();
    };

    useEffect(() => {
        // Create the form when both script is loaded and component is mounted
        if (scriptLoaded && loaded && formId && window.hbspt && window.hbspt.forms) {
            // Clear any existing form in the container
            const container = document.getElementById('hubspotFormContainer');
            if (container) {
                container.innerHTML = '';
            }

            // Create the new form
            window.hbspt.forms.create({
                target: "#hubspotFormContainer",
                region: "na1",
                portalId: "19644562",
                formId: formId
            });
        }
    }, [scriptLoaded, loaded, formId]);

    // Don't render anything if no formId is provided
    if (!formId) {
        return null;
    }

    return (
        <div id="hubspotFormContainer" className={hideClass ? '' : "lg:px-20 max-w-3xl mx-auto sm:px-5"}>
            {!scriptLoaded && (
                <Script
                    id="hubspotFormLibrary"
                    src="//js.hsforms.net/forms/embed/v2.js"
                    onLoad={handleScriptLoad}
                    strategy="afterInteractive"
                />
            )}
            {scriptLoaded && loaded && (
                <div>
                    {/* Form will be rendered here by the useEffect */}
                </div>
            )}
        </div>
    );
};









