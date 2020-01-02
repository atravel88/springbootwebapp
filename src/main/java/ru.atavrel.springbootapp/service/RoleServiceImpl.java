package ru.atavrel.springbootapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.atavrel.springbootapp.dao.RolesRepository;
import ru.atavrel.springbootapp.model.Role;
import ru.atavrel.springbootapp.model.User;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    private RolesRepository rolesRepository;

    @Autowired
    public void setRolesRepository(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    @Override
    public List<Role> getAll() {
        return (List<Role>) rolesRepository.findAll();
    }
}