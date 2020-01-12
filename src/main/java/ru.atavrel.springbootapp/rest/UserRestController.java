package ru.atavrel.springbootapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.atavrel.springbootapp.exception.ResourceNotFoundException;
import ru.atavrel.springbootapp.model.User;
import ru.atavrel.springbootapp.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
class UserRestController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    // GET: http://localhost:8080/api/users
    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    //GET: http://localhost:8080/api/users/{id}
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user == null) {
            throw new ResourceNotFoundException("No user found with such id: " + id);
        }
        return user;
    }

    //GET: http://localhost:8080/api/user/email/{email}
    @GetMapping("/email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@PathVariable("email") String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("No user found with such email: " + email);
        }
        return user;
    }

    //POST: http://localhost:8080/api/users/
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user) {
        userService.add(user);
        return user;
    }

    //PUT: http://localhost:8080/api/users/
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody User user) {
        User userFromDB = userService.getById(user.getId());
        if (userFromDB == null) {
            throw new ResourceNotFoundException("No user found with such id: " + user.getId());
        }
        userService.add(user);
    }

    //DELETE: http://localhost:8080/api/users/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user == null) {
            throw new ResourceNotFoundException("No user found with such id: " + id);
        }
        userService.deleteById(id);
    }
}
