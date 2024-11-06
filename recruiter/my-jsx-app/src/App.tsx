import { error } from 'console';
import { MongoClient } from 'mongodb';
// import { MongoClient } from 'mongodb';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';


interface Candidate {
  name: string;
  score: string;
  educational_background: string;
  experience: string;
  skills: string;
  justification: string;
  
}


const RecruitmentSourcingApp: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/candidates')
  //     .then((response) => response.json())
  //     .then((data) => setCandidates(data))
  //     .catch((error) => {
  //       console.error('Failed to fetch data from backend:', error);
  //       setMessage('Failed to fetch candidates');
  //     });
  // }, []);
  
  // useEffect(() => {
  //   // Define the async function
  //   const fetchCandidates = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/candidates');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data: Candidate[] = await response.json();
  //       setCandidates(data);
  //     } catch (error) {
  //       console.error('Failed to fetch data from backend:', error);
  //       setMessage('Failed to fetch candidates');
  //     }
  //   };

    // Call the async function
  //   fetchCandidates();
  // }, []); // Empty dependency array ensures this runs once on mount

 
  // useEffect(() => {
  //   // Fetch initial candidates
  //   fetch('http://localhost:5000/api/candidates')
  //     .then((response) => response.json())
  //     .then((data) => setCandidates(data))
  //     .catch((error) => {
  //       console.error('Failed to fetch data from backend:', error);
  //       setMessage('Failed to fetch candidates');
  //     });

  //   // Listen for real-time updates from WebSocket
  //   socket.on('newCandidates', (updatedCandidates: Candidate[]) => {
  //     setCandidates(updatedCandidates);  // Update candidates state with new data
  //   });

  //   // Cleanup socket on component unmount
  //   return () => {
  //     socket.off('newCandidates');
  //     socket.disconnect();
  //   };
  // }, []);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/candidates');
      const data = await response.json();

      console.log(data)
      setCandidates(data);  // Set initial candidates data
    } catch (error) {
      console.error('Failed to fetch data from backend:', error);
      setMessage('Failed to fetch candidates');
    }
  }


   useEffect(() => {
    // Polling the server every 5 seconds for changes
    const interval = setInterval(fetchData, 25000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('job_description', jobDescription);  // Send job description to the backend

    try {
      // Send POST request to trigger the recruitment process
      const response = await fetch('http://localhost:8000/start-recruitment', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to start recruitment process');
      }

      const result = await response.json();
      console.log(result);  // Process the JSON response
      setMessage(result.message || 'Recruitment process started!');
    } catch (error) {
      console.log('Error: ', error);
      setMessage('Error starting recruitment process');
          }
      
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPdfFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-black text-white flex items-center justify-center p-6">
      <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">JK Recruitment Candidate Sourcing Tool</h1>

        {/* Job Description Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              placeholder="Enter Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-900 outline-none"
            />
          </div>
          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
              Fetch Candidates
            </button>
          </div>
        </form>

        {/* Display status message */}
        {message && (
          <div className="mt-4 text-center">
            <p>{message}</p>
          </div>
        )}

        {/* Display Fetched Candidates */}
        <div className="mt-8">
          {candidates.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Top Candidates</h2>
              <ul className="space-y-4">
                {candidates.map((candidate, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <h3 className="font-bold text-2xl text-blue-900">{candidate.name}</h3>
                    <p><strong>Score:</strong>{candidate.score}</p>
                    <p><strong>Education:</strong> {candidate.educational_background}</p>
                    <p><strong>Experience:</strong> {candidate.experience}</p>
                    <p><strong>Skills:</strong> {candidate.skills}</p>
                    <p><strong>Justification:</strong> {candidate.justification}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentSourcingApp;
