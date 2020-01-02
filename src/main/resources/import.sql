INSERT INTO springbootapp.roles (id, role) values (0, 'ADMIN');
INSERT INTO springbootapp.roles (id, role) values (1, 'USER');
INSERT INTO springbootapp.roles (id, role) values (2, 'MANAGER');
INSERT INTO springbootapp.users (id, email, password) VALUES (0, 'admin@admin.com','$2a$04$sisiSgG/laakmgEZn3hzqO1wEvwz9hMh/t46.o9.uB6HbWwrC0owS');
INSERT INTO springbootapp.users_roles (users_id, roles_id) VALUES (0, 0);
INSERT INTO springbootapp.users_roles (users_id, roles_id) VALUES (0, 1);
INSERT INTO springbootapp.users_roles (users_id, roles_id) VALUES (0, 2);