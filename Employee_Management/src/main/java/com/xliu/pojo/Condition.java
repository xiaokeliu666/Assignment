package com.xliu.pojo;

import lombok.Data;

/**
 * This entity is used for fuzzy search
 * input info : id, name, surname, phone
 * input title: title
 */
public class Condition {
    private String info;
    private String title;

    public Condition() {
    }

    public Condition(String info, String title) {
        this.info = info;
        this.title = title;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
