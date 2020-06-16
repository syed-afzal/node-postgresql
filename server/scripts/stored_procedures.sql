CREATE OR REPLACE PROCEDURE public.create_user(character varying, integer, character varying, character varying, date,
                                                character varying, character varying, character varying)
 LANGUAGE plpgsql
AS $procedure$
begin

    INSERT INTO "Users"
	("name", role_id, gender, dob, imageUrl, email, password)
	VALUES($1, $2, ,$3, $4, $5, $6, $7);

END;
$procedure$
;

CREATE OR REPLACE PROCEDURE assign_role_to_user(INT, VARCHAR, INT)
LANGUAGE plpgsql
AS $$
begin

	IF (select count(*) from "Roles" r2 where id = $1) < 1 then
		insert into "Roles" (id, name) values ($1, $2);
	end if;

	UPDATE "Users"
		SET role_id = $1
	WHERE
		id = $3;
END;
$$;

CREATE OR REPLACE PROCEDURE assign_permissions_to_role(INT, _varchar, INT)
LANGUAGE plpgsql
AS $$
begin

	IF (select count(*) from "Permissions" p2 where id = $1) < 1 then
		insert into "Permissions" (id, name) values ($1, $2);
	end if;

	UPDATE "Roles"
		SET permission_id = $1
	WHERE
		id = $3;
END;
$$;

--admin creation with password 'admin123'
INSERT into "Permissions" (id,"name") VALUES(1, ARRAY['create', 'read', 'update', 'delete']);

INSERT into "Roles" (id, name, permission_id) values (1, 'SUPER ADMIN', 1);
CALL create_user('Afzal', 1, 'male', '1985-05-26', 'upload/user',
 'syed.afzal@venturedive.com', '$2b$10$wADLYcEmQJQIZ/gv5avRnu3yJVRquJroFwThNx3Bcj4dULiviBSfS');
