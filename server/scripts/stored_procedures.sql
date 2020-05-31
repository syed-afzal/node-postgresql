CREATE OR REPLACE PROCEDURE public.create_user(character varying, integer, character varying, character varying, date,
                                                character varying, character varying, character varying)
 LANGUAGE plpgsql
AS $procedure$
begin

	IF (select count(*) from "Roles" r where id = $2) < 1 then
		insert into "Roles" (id, name) values ($2, $3);
	end if;

    INSERT INTO "Users"
	("name", role_id, gender, dob, imageUrl, email, password)
	VALUES($1, $2, $4, $5, $6, $7, $8);

END;
$procedure$
;

CREATE OR REPLACE PROCEDURE assign_permission_to_role(INT, INT, VARCHAR)
LANGUAGE plpgsql
AS $$
begin

	IF (select count(*) from permissions where id = $2) < 1 then
		insert into public."permissions" (id, name) values ($2, $3);
	end if;

    INSERT INTO public."role_permission_relation"
	(role_id, permission_id)
	VALUES($1, $2);

END;
$$;

CALL create_user('Afzal', 1, 'SUPER ADMIN', 'male', '1985-05-26', 'upload/user',
 'syed.afzal@venturedive.com', '$2b$10$wADLYcEmQJQIZ/gv5avRnu3yJVRquJroFwThNx3Bcj4dULiviBSfS');

INSERT into "Permissions" (id,"name") VALUES(1, ARRAY['create', 'read', 'update', 'delete']);

INSERT into "Roles_to_Permissions" (role_id,permission_id) VALUES(1,1);
