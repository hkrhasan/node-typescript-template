import { PrismaClient } from "@prisma/client";
import {
  DEFAULT_ROLES,
  DEFAULT_RESOURCES,
  DEFAULT_PERMISSIONS,
} from "../src/constants";
const prisma = new PrismaClient();

type ENUMS_DATA_TYPES = {
  id: number;
  name: string;
};

async function main() {
  // Create resources
  const resourcesData: Array<ENUMS_DATA_TYPES> = [];

  for (let i = 0; i < DEFAULT_RESOURCES.COUNT; i++) {
    resourcesData.push({
      id: i,
      name: DEFAULT_RESOURCES[i],
    });
  }

  // Create permissions
  const permissionsData: Array<ENUMS_DATA_TYPES> = [];

  for (let i = 0; i < DEFAULT_PERMISSIONS.COUNT; i++) {
    permissionsData.push({
      id: i,
      name: DEFAULT_PERMISSIONS[i],
    });
  }

  // Create roles
  const rolesData: Array<ENUMS_DATA_TYPES> = [];

  for (let i = 0; i < DEFAULT_ROLES.COUNT; i++) {
    rolesData.push({
      id: i,
      name: DEFAULT_ROLES[i],
    });
  }

  Promise.all([
    prisma.resources.createMany({ data: resourcesData }),
    prisma.permission.createMany({ data: permissionsData }),
    prisma.role.createMany({ data: rolesData }),
  ])
    .then(() => {
      console.log("Resources, Permissions and Roles created successfully");
    })
    .catch((err) => {
      console.error(err.message);
      console.log("Error while creating Resources, Permissions and Roles");
    });

  // Create admin user
  prisma.user
    .create({
      data: {
        email: "admin@dhesi.com",
        password: "P@ssw0rd",
        roles: {
          create: {
            roleId: DEFAULT_ROLES.ADMIN,
          },
        },
      },
    })
    .then(() => {
      console.log("Admin user created successfully");
    })
    .catch((err) => {
      console.error(err.message);
      console.log("Error while creating admin user");
    });
}

main();
