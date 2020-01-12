package ru.atavrel.springbootapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.atavrel.springbootapp.dao.UsersRepository;
import ru.atavrel.springbootapp.model.Role;
import ru.atavrel.springbootapp.model.User;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private PasswordEncoder passwordEncoder;
    private UsersRepository usersRepository;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void setUsersRepository(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public User getById(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAll() {
        return (List<User>) usersRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return usersRepository.findUserByEmail(email).orElse(null);
    }

    @Transactional
    @Override
    public void add(User entity) {
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        if (entity.getRoles().isEmpty()){
            entity.getRoles().add(new Role(1L, "USER"));
        }
        usersRepository.save(entity);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        usersRepository.deleteById(id);
    }

}
