package ru.atavrel.springbootapp.dao;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import ru.atavrel.springbootapp.model.Role;

import java.util.Optional;

public interface RolesRepository extends CrudRepository<Role, Long> {

    @EntityGraph(attributePaths = {"users"})
    Optional<Role> findById(Long id);

}

