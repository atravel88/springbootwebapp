package ru.atavrel.springbootapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.atavrel.springbootapp.model.Role;
import ru.atavrel.springbootapp.model.User;
import ru.atavrel.springbootapp.service.RoleService;
import ru.atavrel.springbootapp.service.UserService;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public String userList(Model model) {
        model.addAttribute("user", new User());
        List<User> userList = userService.getAll();
        model.addAttribute("users", userList);
        List<Role> roleList = roleService.getAll();
        model.addAttribute("roles", roleList);
        return "admin";
    }

    @PostMapping("/delete")
    public String deleteUser(@RequestParam("id") Long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

    @PostMapping
    public String addUser(User user) {
        if (user.getAge() == null) {
            user.setAge(0);
        }
        if (user.getRoles().isEmpty()) {
            user.getRoles().add(new Role(1L, "USER"));
        }
        userService.add(user);
        return "redirect:/admin";
    }
/*
    @GetMapping("/edit")
    public String updatePage(@RequestParam("id") Long id, Model model) {
        User user = userService.getById(id);
        model.addAttribute("user", user);
        List<Role> roleList = roleService.getAll(); // тащим все роли из базы
        model.addAttribute("allRoles", roleList); // кидаем все роли из базы в атрибуты
        Set<Role> userRoles = user.getRoles(); // получаем набор ролей у Юзера
        model.addAttribute("userRoles", userRoles); // кидаем роли юзера в атрибуты
        return "adminUpdate";
    }
*/
    @PostMapping("/edit")
    public String updateUser(@ModelAttribute("user") User user) {
        if (user.getRoles().isEmpty()) {
            user.getRoles().add(new Role(1L, "USER"));
        }
        if (user.getAge() == null) {
            user.setAge(0);
        }
        userService.update(user);
        return "redirect:/admin";
    }
}
