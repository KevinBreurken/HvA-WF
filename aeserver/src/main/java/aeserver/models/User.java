package aeserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Random;

@Entity
public class User {
  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private String email;
  private String hashedPassWord;
  private boolean admin;

  public User() {
  }

  /**
   * Sets the email, password but also the name based upon the e-mailadres.
   * @param email e-mailadres of the user
   * @param hashedPassWord hashed password of the user
   */
  public User(String email, String hashedPassWord) {
    this.id = Math.round(Math.random()*2000);
    this.name = email.split("@")[0];
    this.email = email;
    this.hashedPassWord = hashedPassWord;
  }

  public User(Long id, String name, String email, String hashedPassWord, boolean admin) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassWord = hashedPassWord;
    this.admin = admin;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getHashedPassWord() {
    return hashedPassWord;
  }

  public void setHashedPassWord(String hashedPassWord) {
    this.hashedPassWord = hashedPassWord;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
