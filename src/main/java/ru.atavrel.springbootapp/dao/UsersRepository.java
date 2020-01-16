package ru.atavrel.springbootapp.dao;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import ru.atavrel.springbootapp.model.User;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends CrudRepository<User, Long> {

    @EntityGraph(attributePaths = {"roles"})
    Optional<User> findUserByEmail(String email);

    @EntityGraph(attributePaths = {"roles"})
    List<User> findAll();

    @EntityGraph(attributePaths = {"roles"})
    Optional<User> findById(Long id);
}
