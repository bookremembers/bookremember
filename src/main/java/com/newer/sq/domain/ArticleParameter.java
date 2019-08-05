package com.newer.sq.domain;

import java.util.List;

public class ArticleParameter {
    private Integer fonts;
    private Integer titles;
    private Integer prints;
    private List<Article> articles;
    private Integer pageTotal;

    public Integer getFonts() {
        return fonts;
    }

    public void setFonts(Integer fonts) {
        this.fonts = fonts;
    }

    public Integer getTitles() {
        return titles;
    }

    public void setTitles(Integer titles) {
        this.titles = titles;
    }

    public Integer getPrints() {
        return prints;
    }

    public void setPrints(Integer prints) {
        this.prints = prints;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

    public Integer getPageTotal() {
        return pageTotal;
    }

    public void setPageTotal(Integer pageTotal) {
        this.pageTotal = pageTotal;
    }
}
