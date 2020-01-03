package ru.atavrel.springbootapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.atavrel.springbootapp.model.Role;
import ru.atavrel.springbootapp.service.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
class RoleRestController {

    private RoleService roleService;

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    // GET: http://localhost:8080/api/roles
    @GetMapping
    public List<Role> getAll() {
        return roleService.getAll();
    }
}
