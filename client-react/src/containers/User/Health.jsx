import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';

const HealthInfo = () => {

    return(
        <>
             <Header />
                <section className="bg-gray-100 h-screen flex items-center justify-center">

                    <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-semibold mb-4">Health Information</h1>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
                        <p><strong>Name:</strong> John Doe</p>
                        <p><strong>Age:</strong> 30</p>
                        <p><strong>Gender:</strong> Male</p>
                        </div>

                        <div>
                        <h2 className="text-lg font-semibold mb-2">Vital Signs</h2>
                        <p><strong>Weight:</strong> 70 kg</p>
                        <p><strong>Height:</strong> 175 cm</p>
                        <p><strong>Blood Pressure:</strong> 120/80 mmHg</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Additional Health Information</h2>
                        <p><strong>Medical Conditions:</strong> None</p>
                        <p><strong>Medications:</strong> None</p>
                        <p><strong>Allergies:</strong> None</p>
                    </div>
                    </div>

                </section>
            <Footer />
        </>
    )
}

export default HealthInfo