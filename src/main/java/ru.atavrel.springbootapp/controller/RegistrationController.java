package ru.atavrel.springbootapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import ru.atavrel.springbootapp.model.Role;
import ru.atavrel.springbootapp.model.User;
import ru.atavrel.springbootapp.service.UserService;
import java.util.HashSet;
import java.util.Set;


@Controller
public class RegistrationController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("user", new User());
        return "registration";
    }

    @PostMapping("/registration")
    public String addUser(User user) {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role(1L, "USER"));
        user.setRoles(roles);
        if (userService.add(user)) {
            return "redirect:/";
        }
        return "registration";
    }
}
