import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NEWS_API_URL } from "../../config/apiConfig";
import { auth } from "../../firebase";
import NewsGrid from "../NewsGrid/NewsGrid";
import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';


function Home(props) {
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'

  // Function to fetch API
  const fetchNews = async () => {
    try {
      const response = await axios.get(NEWS_API_URL);
      setNewsData(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    // Fetch news from the API here
    fetchNews();
  }, []);

  // Function to add or remove the Favorite article
  const handleFavoriteToggle = (article) => {
    // just toggle the 'favorite' property of the article
    setNewsData((prevNewsData) =>
      prevNewsData.map((item) =>
        item === article ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  // Function for logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // The user has been successfully signed out
      navigate("/login"); // Use navigate to redirect to the login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {props.name ? (
        <>
          <div className={styles.navbar}>
            <span className={styles.welcomeMessage}>
              Welcome - {props.name}
            </span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
          <section className={styles.introSection}>
            <h1 className={styles.mainTitle}>Welcome to News Reader</h1>
            <h2 className={styles.subTitle}>Top headlines from TechCrunch</h2>
          </section>
          <NewsGrid newsData={newsData} onFavoriteToggle={handleFavoriteToggle} />
        </>
      ) : (
        <div className={styles.homeContainer}>
          <div className={styles.homeInnerBox}>
            <h2 className={styles.loginButton}>
              <Link  to="/login" className={styles.link}>
                Login
              </Link>
            </h2>
            <h2 className={styles.signupButton}>
              <Link to="/signup" className={styles.link}>
                Register
              </Link>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

