package ru.atavrel.springbootapp.service;

import ru.atavrel.springbootapp.model.User;

import java.util.List;

public interface UserService {

    User getById(Long id);

    List<User> getAll();

    User getUserByEmail(String email);

    boolean add(User user);

    void deleteById(Long id);

    void update(User user);
}