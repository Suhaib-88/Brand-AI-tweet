import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { useState } from 'react';

interface DashboardProps {
    token: string;
}
interface Tweet{
    id: number;
    author: string;
    content: string;
    suggestedReply: string;
}

const Dashboard: React.FC<DashboardProps> = ({token}) => {
    const [keywords, setKeywords] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const chartData= [
        {name: "Jan", tweets: 50, replies: 20},
        {name: "Feb", tweets: 60, replies: 25},
        {name: "Mar", tweets: 70, replies: 30},
        {name: "Apr", tweets: 80, replies: 35},
        {name: "May", tweets: 90, replies: 40},
        {name: "Jun", tweets: 100, replies: 45},
    ]
    const placeholderTweets: Tweet[] = [
        {id: 1, author: "John Doe", content: "This is a test tweet", suggestedReply: "We are thrilled you are enjoying it john"},
        {id: 2, author: "Matt Damon", content: "This is a test 2 tweet", suggestedReply: "We are thrilled you are enjoying it Matt"},
        {id: 3, author: "Bratt putt", content: "This is a test 3 tweet", suggestedReply: "We are thrilled you are enjoying it Bratt"},
    ];
    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.target.value);
    };

    const handleKeywordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Keywords submitted:", keywords);
    };
    
    const handleReply= (tweetId:number) => {
        console.log(`Replying to tweet ${tweetId}`);
    };
    return (
        <div className="dashboard-container">
          <div className="left-panel">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>129+</h3>
                <p>Tweets Analyzed</p>
              </div>
              <div className="stat-card">
                <h3>20+</h3>
                <p>Replies Sent</p>
              </div>
              <div className="stat-card">
                <h3>130+</h3>
                <p>Engagements</p>
              </div>
              <div className="stat-card">
                <h3>15+</h3>
                <p>New Followers</p>
              </div>
            </div>
    
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tweets" stroke="#6366f1" name="Tweets" />
                  <Line type="monotone" dataKey="replies" stroke="#10b981" name="Replies" />
                </LineChart>
              </ResponsiveContainer>
            </div>
    
            <form className="keyword-search" onSubmit={handleKeywordSubmit}>
              <input
                type="text"
                placeholder="Enter keywords to track (comma-separated)"
                value={keywords}
                onChange={handleKeywordChange}
              />
              <button type="submit">Update Keywords</button>
            </form>
          </div>
    
          <div className="right-panel">
            <div className="tweet-feed">
              {placeholderTweets.map((tweet) => (
                <div key={tweet.id} className="tweet">
                  <div className="tweet-author">{tweet.author}</div>
                  <div className="tweet-content">{tweet.content}</div>
                  <div className="tweet-reply">
                    <div className="ai-label">AI-generated response:</div>
                    <p>{tweet.suggestedReply}</p>
                    <button className="reply-button" onClick={() => handleReply(tweet.id)}>Reply</button>
                  </div>
                </div>
              ))}
            </div>
    
            <div className="pagination">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <span>Page {currentPage} of 1</span>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 1}>
                Next
              </button>
            </div>
          </div>
    
          <button className="logout-button">Logout</button>
        </div>
      );
    
    
}


export default Dashboard;
