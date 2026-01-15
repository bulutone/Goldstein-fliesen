import React from 'react';

const Impressum = () => {
    return (
        <div className="section" style={{ paddingTop: '10rem', minHeight: '60vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Impressum</h1>

                <div style={{ lineHeight: '1.8' }}>
                    <h3>Angaben gem. §5 TMG:</h3>
                    <p>Goldstein Glasgeländer und Fliesen<br />
                        Inhaber: Vedat Altuntas<br />
                        <a href="https://www.google.com/maps/search/?api=1&query=Moritz+Straße+59,+55130+Mainz" target="_blank" rel="noopener noreferrer">Moritz Straße 59<br />
                            55130 Mainz</a></p>

                    <h3 style={{ marginTop: '2rem' }}>Verantwortlich für den Inhalt:</h3>
                    <p>Vedat Altuntas</p>

                    <h3 style={{ marginTop: '2rem' }}>Steuernummer:</h3>
                    <p>26/501/11587</p>

                    <h3 style={{ marginTop: '2rem' }}>Kontakt:</h3>
                    <p>Tel.: <a href="tel:+491601849355">0160 1849355</a><br />
                        Email: <a href="mailto:info@goldstein-fliesen.de">info@goldstein-fliesen.de</a><br />
                        Web: <a href="https://www.goldstein-fliesen.de">www.goldstein-fliesen.de</a></p>

                    <h3 style={{ marginTop: '2rem' }}>Haftungsausschluss:</h3>
                    <p>Hiermit distanzieren wir uns ausdrücklich von allen Grafiken und Inhalten aller gelinkten Seiten und machen uns diese nicht zu eigen. Diese Erklärung gilt für alle auf diesen Webseiten angebrachten Hyperlinks und externen Seiten. Externe Seiten sind Seiten, die nicht zur Domain www.goldstein-fliesen.de gehören.</p>
                </div>
            </div>
        </div>
    );
};

export default Impressum;
