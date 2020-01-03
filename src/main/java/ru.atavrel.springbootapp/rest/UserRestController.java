package ru.atavrel.springbootapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    //todo: прописать настройки доступа к api в security
    //todo: добавить или нет обработку ошибок при работе с неверными данными?
    // + возвращать правильные статусы?
    // + для update передавать Id или нет ?


    // GET: http://localhost:8080/api/users
    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    //GET: http://localhost:8080/api/users/id
    @GetMapping("{id}")
    public User getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    //POST: http://localhost:8080/api/users/
    @PostMapping
    public boolean save(@RequestBody User user) {
        return userService.add(user);
    }

    //PUT: http://localhost:8080/api/users/id
    @PutMapping("{id}")
    public void updateById(@PathVariable("id") Long id, @RequestBody User user) {
        // что делать с id ? (пока просто устанавливаю id юзеру)
        user.setId(id);
        userService.update(user);
    }

    //DELETE: http://localhost:8080/api/users/id
    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }

/*
    //getByUsername(String username)
    @GetMapping("/users/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }
*/
}
