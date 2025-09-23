import Script from 'next/script';
import React, { useState } from 'react';

export const HubspotEmbedForm = ({ formId, onLoad, hideClass = false }) => {
console.log("formId ==> ", formId);
    const [loaded, setLoaded] = useState(false);
    return (
        <div id="hubspotFormContainer" className={hideClass ? '' : "lg:px-20 max-w-3xl mx-auto px-5"}>
            <Script id="hubspotFormLibrary" src="//js.hsforms.net/forms/embed/v2.js" onLoad={() => { setLoaded(true); onLoad && onLoad(); }} />
            {loaded && (
                <Script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.hbspt.forms.create({
                                target: "#hubspotFormContainer",
                                region: "na1",
                                portalId: "23632167",
                                formId: "${formId}"
                            });
                        `,
                    }}
                />
            )}
        </div>
    );
};









