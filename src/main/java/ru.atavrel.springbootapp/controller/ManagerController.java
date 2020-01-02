package ru.atavrel.springbootapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.atavrel.springbootapp.model.User;
import ru.atavrel.springbootapp.service.UserService;

import java.util.List;

@Controller
public class ManagerController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/manager")
    public String userList(Model model) {
        List<User> userList = userService.getAll();
        model.addAttribute("users", userList);
        return "manager";
    }
}
