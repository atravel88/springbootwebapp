package ru.atavrel.springbootapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.atavrel.springbootapp.model.Role;
import ru.atavrel.springbootapp.model.User;
import ru.atavrel.springbootapp.service.RoleService;
import ru.atavrel.springbootapp.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
class AdminRestController {

    private RoleService roleService;

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    // GET: http://localhost:8080/api/admin/users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAll() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    //GET: http://localhost:8080/api/admin/users/{id}
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //GET: http://localhost:8080/api/admin/users/email/{email}
    @GetMapping("/users/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //POST: http://localhost:8080/api/admin/users/
    @PostMapping("/users")
    public ResponseEntity<User> save(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }


    //PUT: http://localhost:8080/api/admin/users/
    @PutMapping("/users")
    public ResponseEntity<User> update(@RequestBody User user) {
        User userFromDB = userService.getById(user.getId());
        if (userFromDB == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        userService.add(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //DELETE: http://localhost:8080/api/admin/users/{id}
    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteById(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // GET: http://localhost:8080/api/admin/roles
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getAll(), HttpStatus.OK);
    }

}
