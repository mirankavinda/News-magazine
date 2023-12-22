import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error('Error fetching data:', error));
  }, [category]);

  return (
    <div>
      <h4 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h4>
      {articles.map((news, index) => (
        <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
      ))}
    </div>
  );
};

export default NewsBoard;
