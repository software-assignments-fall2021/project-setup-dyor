import * as React from "react";
import Paper from "@mui/material/Paper";
import "./article.css";

export default function Article({ article }) {
  function parseHtml(description) {
    return { __html: description };
  }

  return (
    <Paper elevation={2} variant="outlined" className="article_paper">
      <article className="article_content">
        <div className="image">
          { article.urlToImage !== null && article.urlToImage !== undefined &&
            <img
            className="article_image"
            src={article.urlToImage}
            alt=""
          />
          }
        </div>
        <div className="description">
          <h4 className="article_title">
            <a href= {article.url} target="blank">
              {article.title}
            </a>
          </h4>
          <h5 className="extract_title">{article.author}</h5>
          <p
            className="article_story"
            dangerouslySetInnerHTML={parseHtml(article.description)}
          />
        </div>
      </article>
    </Paper>
  );
}
