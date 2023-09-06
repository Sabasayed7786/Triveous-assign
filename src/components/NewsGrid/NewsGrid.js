import React from "react";
import styles from "./NewsGrid.module.css";
import { getAuth } from "firebase/auth"; // Import getAuth from Firebase
import { auth } from "../../firebase"; // Import your Firebase configuration from your firebase.js file

const NewsGrid = ({ newsData, onArticleClick, onFavoriteToggle }) => {
  const firebaseAuth = getAuth();

  // Function to check if the user is authenticated
  const isUserAuthenticated = () => {
    const user = firebaseAuth.currentUser;
    return !!user; // Returns true if the user is authenticated, false otherwise
  };

  return (
    <div className={styles.gridcontainer}>
      {newsData.map((article) => (
        <div
          key={article.title}
          className={styles.griditem}
          style={{ marginBottom: "30px" }}
        >
          <img src={article.urlToImage} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <div>
            <button
              onClick={() => {
                if (isUserAuthenticated()) {
                  onFavoriteToggle(article);
                } else {
                  // Handle the case when the user is not authenticated
                  alert("Please log in to add to favorites.");
                }
              }}
            >
              {article.favorite ? "Remove Favorite" : "Add Favorite"}
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "20px" }}
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
