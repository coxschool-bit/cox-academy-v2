# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `homeschool-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*GetClassDetails*](#getclassdetails)
  - [*GetMyEnrollments*](#getmyenrollments)
  - [*GetClassAssignments*](#getclassassignments)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateClass*](#createclass)
  - [*CreateAssignment*](#createassignment)
  - [*SubmitAssignment*](#submitassignment)
  - [*GradeSubmission*](#gradesubmission)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `homeschool-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/homeschool-connector-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/homeschool-connector-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/homeschool-connector-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `homeschool-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    gradeLevel?: string | null;
    household?: {
      id: UUIDString;
      name: string;
      subscriptionTier: string;
    } & Household_Key;
  } & User_Key;
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@firebasegen/homeschool-connector-connector';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@firebasegen/homeschool-connector-connector';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetClassDetails
You can execute the `GetClassDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getClassDetails(vars: GetClassDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassDetailsData, GetClassDetailsVariables>;

interface GetClassDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassDetailsVariables): QueryRef<GetClassDetailsData, GetClassDetailsVariables>;
}
export const getClassDetailsRef: GetClassDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getClassDetails(dc: DataConnect, vars: GetClassDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassDetailsData, GetClassDetailsVariables>;

interface GetClassDetailsRef {
  ...
  (dc: DataConnect, vars: GetClassDetailsVariables): QueryRef<GetClassDetailsData, GetClassDetailsVariables>;
}
export const getClassDetailsRef: GetClassDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getClassDetailsRef:
```typescript
const name = getClassDetailsRef.operationName;
console.log(name);
```

### Variables
The `GetClassDetails` query requires an argument of type `GetClassDetailsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetClassDetailsVariables {
  classId: UUIDString;
}
```
### Return Type
Recall that executing the `GetClassDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetClassDetailsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetClassDetailsData {
  class?: {
    id: UUIDString;
    name: string;
    subject: string;
    color: string;
    teacherId: string;
  } & Class_Key;
}
```
### Using `GetClassDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getClassDetails, GetClassDetailsVariables } from '@firebasegen/homeschool-connector-connector';

// The `GetClassDetails` query requires an argument of type `GetClassDetailsVariables`:
const getClassDetailsVars: GetClassDetailsVariables = {
  classId: ..., 
};

// Call the `getClassDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getClassDetails(getClassDetailsVars);
// Variables can be defined inline as well.
const { data } = await getClassDetails({ classId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getClassDetails(dataConnect, getClassDetailsVars);

console.log(data.class);

// Or, you can use the `Promise` API.
getClassDetails(getClassDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.class);
});
```

### Using `GetClassDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getClassDetailsRef, GetClassDetailsVariables } from '@firebasegen/homeschool-connector-connector';

// The `GetClassDetails` query requires an argument of type `GetClassDetailsVariables`:
const getClassDetailsVars: GetClassDetailsVariables = {
  classId: ..., 
};

// Call the `getClassDetailsRef()` function to get a reference to the query.
const ref = getClassDetailsRef(getClassDetailsVars);
// Variables can be defined inline as well.
const ref = getClassDetailsRef({ classId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getClassDetailsRef(dataConnect, getClassDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.class);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.class);
});
```

## GetMyEnrollments
You can execute the `GetMyEnrollments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getMyEnrollments(vars: GetMyEnrollmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;

interface GetMyEnrollmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyEnrollmentsVariables): QueryRef<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;
}
export const getMyEnrollmentsRef: GetMyEnrollmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyEnrollments(dc: DataConnect, vars: GetMyEnrollmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;

interface GetMyEnrollmentsRef {
  ...
  (dc: DataConnect, vars: GetMyEnrollmentsVariables): QueryRef<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;
}
export const getMyEnrollmentsRef: GetMyEnrollmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyEnrollmentsRef:
```typescript
const name = getMyEnrollmentsRef.operationName;
console.log(name);
```

### Variables
The `GetMyEnrollments` query requires an argument of type `GetMyEnrollmentsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyEnrollmentsVariables {
  studentId: string;
}
```
### Return Type
Recall that executing the `GetMyEnrollments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyEnrollmentsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyEnrollmentsData {
  enrollments: ({
    class: {
      id: UUIDString;
      name: string;
      subject: string;
      color: string;
    } & Class_Key;
  })[];
}
```
### Using `GetMyEnrollments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyEnrollments, GetMyEnrollmentsVariables } from '@firebasegen/homeschool-connector-connector';

// The `GetMyEnrollments` query requires an argument of type `GetMyEnrollmentsVariables`:
const getMyEnrollmentsVars: GetMyEnrollmentsVariables = {
  studentId: ..., 
};

// Call the `getMyEnrollments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyEnrollments(getMyEnrollmentsVars);
// Variables can be defined inline as well.
const { data } = await getMyEnrollments({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyEnrollments(dataConnect, getMyEnrollmentsVars);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
getMyEnrollments(getMyEnrollmentsVars).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `GetMyEnrollments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyEnrollmentsRef, GetMyEnrollmentsVariables } from '@firebasegen/homeschool-connector-connector';

// The `GetMyEnrollments` query requires an argument of type `GetMyEnrollmentsVariables`:
const getMyEnrollmentsVars: GetMyEnrollmentsVariables = {
  studentId: ..., 
};

// Call the `getMyEnrollmentsRef()` function to get a reference to the query.
const ref = getMyEnrollmentsRef(getMyEnrollmentsVars);
// Variables can be defined inline as well.
const ref = getMyEnrollmentsRef({ studentId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyEnrollmentsRef(dataConnect, getMyEnrollmentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## GetClassAssignments
You can execute the `GetClassAssignments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getClassAssignments(vars: GetClassAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassAssignmentsData, GetClassAssignmentsVariables>;

interface GetClassAssignmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassAssignmentsVariables): QueryRef<GetClassAssignmentsData, GetClassAssignmentsVariables>;
}
export const getClassAssignmentsRef: GetClassAssignmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getClassAssignments(dc: DataConnect, vars: GetClassAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassAssignmentsData, GetClassAssignmentsVariables>;

interface GetClassAssignmentsRef {
  ...
  (dc: DataConnect, vars: GetClassAssignmentsVariables): QueryRef<GetClassAssignmentsData, GetClassAssignmentsVariables>;
}
export const getClassAssignmentsRef: GetClassAssignmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getClassAssignmentsRef:
```typescript
const name = getClassAssignmentsRef.operationName;
console.log(name);
```

### Variables
The `GetClassAssignments` query requires an argument of type `GetClassAssignmentsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetClassAssignmentsVariables {
  classId: UUIDString;
}
```
### Return Type
Recall that executing the `GetClassAssignments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetClassAssignmentsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetClassAssignmentsData {
  assignments: ({
    id: UUIDString;
    title: string;
    instruction?: string | null;
    dueDate: DateString;
  } & Assignment_Key)[];
}
```
### Using `GetClassAssignments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getClassAssignments, GetClassAssignmentsVariables } from '@firebasegen/homeschool-connector-connector';

// The `GetClassAssignments` query requires an argument of type `GetClassAssignmentsVariables`:
const getClassAssignmentsVars: GetClassAssignmentsVariables = {
  classId: ..., 
};

// Call the `getClassAssignments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getClassAssignments(getClassAssignmentsVars);
// Variables can be defined inline as well.
const { data } = await getClassAssignments({ classId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getClassAssignments(dataConnect, getClassAssignmentsVars);

console.log(data.assignments);

// Or, you can use the `Promise` API.
getClassAssignments(getClassAssignmentsVars).then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

### Using `GetClassAssignments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getClassAssignmentsRef, GetClassAssignmentsVariables } from '@firebasegen/homeschool-connector-connector';

// The `GetClassAssignments` query requires an argument of type `GetClassAssignmentsVariables`:
const getClassAssignmentsVars: GetClassAssignmentsVariables = {
  classId: ..., 
};

// Call the `getClassAssignmentsRef()` function to get a reference to the query.
const ref = getClassAssignmentsRef(getClassAssignmentsVars);
// Variables can be defined inline as well.
const ref = getClassAssignmentsRef({ classId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getClassAssignmentsRef(dataConnect, getClassAssignmentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `homeschool-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  name: string;
  role: string;
  householdId?: UUIDString | null;
  gradeLevel?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@firebasegen/homeschool-connector-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  name: ..., 
  role: ..., 
  householdId: ..., // optional
  gradeLevel: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., name: ..., role: ..., householdId: ..., gradeLevel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@firebasegen/homeschool-connector-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  name: ..., 
  role: ..., 
  householdId: ..., // optional
  gradeLevel: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., name: ..., role: ..., householdId: ..., gradeLevel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateClass
You can execute the `CreateClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClassRef:
```typescript
const name = createClassRef.operationName;
console.log(name);
```

### Variables
The `CreateClass` mutation requires an argument of type `CreateClassVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClassVariables {
  name: string;
  subject: string;
  color?: string | null;
  teacherId: string;
}
```
### Return Type
Recall that executing the `CreateClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClassData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClassData {
  class_insert: Class_Key;
}
```
### Using `CreateClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClass, CreateClassVariables } from '@firebasegen/homeschool-connector-connector';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  name: ..., 
  subject: ..., 
  color: ..., // optional
  teacherId: ..., 
};

// Call the `createClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClass(createClassVars);
// Variables can be defined inline as well.
const { data } = await createClass({ name: ..., subject: ..., color: ..., teacherId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClass(dataConnect, createClassVars);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
createClass(createClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

### Using `CreateClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClassRef, CreateClassVariables } from '@firebasegen/homeschool-connector-connector';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  name: ..., 
  subject: ..., 
  color: ..., // optional
  teacherId: ..., 
};

// Call the `createClassRef()` function to get a reference to the mutation.
const ref = createClassRef(createClassVars);
// Variables can be defined inline as well.
const ref = createClassRef({ name: ..., subject: ..., color: ..., teacherId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClassRef(dataConnect, createClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

## CreateAssignment
You can execute the `CreateAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createAssignment(vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface CreateAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
}
export const createAssignmentRef: CreateAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAssignment(dc: DataConnect, vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface CreateAssignmentRef {
  ...
  (dc: DataConnect, vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
}
export const createAssignmentRef: CreateAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAssignmentRef:
```typescript
const name = createAssignmentRef.operationName;
console.log(name);
```

### Variables
The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAssignmentVariables {
  title: string;
  instruction?: string | null;
  dueDate: DateString;
  classId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAssignmentData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAssignmentData {
  assignment_insert: Assignment_Key;
}
```
### Using `CreateAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAssignment, CreateAssignmentVariables } from '@firebasegen/homeschool-connector-connector';

// The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`:
const createAssignmentVars: CreateAssignmentVariables = {
  title: ..., 
  instruction: ..., // optional
  dueDate: ..., 
  classId: ..., 
};

// Call the `createAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAssignment(createAssignmentVars);
// Variables can be defined inline as well.
const { data } = await createAssignment({ title: ..., instruction: ..., dueDate: ..., classId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAssignment(dataConnect, createAssignmentVars);

console.log(data.assignment_insert);

// Or, you can use the `Promise` API.
createAssignment(createAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment_insert);
});
```

### Using `CreateAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAssignmentRef, CreateAssignmentVariables } from '@firebasegen/homeschool-connector-connector';

// The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`:
const createAssignmentVars: CreateAssignmentVariables = {
  title: ..., 
  instruction: ..., // optional
  dueDate: ..., 
  classId: ..., 
};

// Call the `createAssignmentRef()` function to get a reference to the mutation.
const ref = createAssignmentRef(createAssignmentVars);
// Variables can be defined inline as well.
const ref = createAssignmentRef({ title: ..., instruction: ..., dueDate: ..., classId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAssignmentRef(dataConnect, createAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assignment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment_insert);
});
```

## SubmitAssignment
You can execute the `SubmitAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
submitAssignment(vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;

interface SubmitAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
}
export const submitAssignmentRef: SubmitAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitAssignment(dc: DataConnect, vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;

interface SubmitAssignmentRef {
  ...
  (dc: DataConnect, vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
}
export const submitAssignmentRef: SubmitAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitAssignmentRef:
```typescript
const name = submitAssignmentRef.operationName;
console.log(name);
```

### Variables
The `SubmitAssignment` mutation requires an argument of type `SubmitAssignmentVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitAssignmentVariables {
  submissionId: UUIDString;
  fileUrl: string;
}
```
### Return Type
Recall that executing the `SubmitAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitAssignmentData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitAssignmentData {
  submission_update?: Submission_Key | null;
}
```
### Using `SubmitAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitAssignment, SubmitAssignmentVariables } from '@firebasegen/homeschool-connector-connector';

// The `SubmitAssignment` mutation requires an argument of type `SubmitAssignmentVariables`:
const submitAssignmentVars: SubmitAssignmentVariables = {
  submissionId: ..., 
  fileUrl: ..., 
};

// Call the `submitAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitAssignment(submitAssignmentVars);
// Variables can be defined inline as well.
const { data } = await submitAssignment({ submissionId: ..., fileUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitAssignment(dataConnect, submitAssignmentVars);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
submitAssignment(submitAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

### Using `SubmitAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitAssignmentRef, SubmitAssignmentVariables } from '@firebasegen/homeschool-connector-connector';

// The `SubmitAssignment` mutation requires an argument of type `SubmitAssignmentVariables`:
const submitAssignmentVars: SubmitAssignmentVariables = {
  submissionId: ..., 
  fileUrl: ..., 
};

// Call the `submitAssignmentRef()` function to get a reference to the mutation.
const ref = submitAssignmentRef(submitAssignmentVars);
// Variables can be defined inline as well.
const ref = submitAssignmentRef({ submissionId: ..., fileUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitAssignmentRef(dataConnect, submitAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

## GradeSubmission
You can execute the `GradeSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
gradeSubmission(vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;

interface GradeSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
}
export const gradeSubmissionRef: GradeSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
gradeSubmission(dc: DataConnect, vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;

interface GradeSubmissionRef {
  ...
  (dc: DataConnect, vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
}
export const gradeSubmissionRef: GradeSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the gradeSubmissionRef:
```typescript
const name = gradeSubmissionRef.operationName;
console.log(name);
```

### Variables
The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GradeSubmissionVariables {
  submissionId: UUIDString;
  grade: string;
  feedback: string;
}
```
### Return Type
Recall that executing the `GradeSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GradeSubmissionData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GradeSubmissionData {
  submission_update?: Submission_Key | null;
}
```
### Using `GradeSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, gradeSubmission, GradeSubmissionVariables } from '@firebasegen/homeschool-connector-connector';

// The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`:
const gradeSubmissionVars: GradeSubmissionVariables = {
  submissionId: ..., 
  grade: ..., 
  feedback: ..., 
};

// Call the `gradeSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await gradeSubmission(gradeSubmissionVars);
// Variables can be defined inline as well.
const { data } = await gradeSubmission({ submissionId: ..., grade: ..., feedback: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await gradeSubmission(dataConnect, gradeSubmissionVars);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
gradeSubmission(gradeSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

### Using `GradeSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, gradeSubmissionRef, GradeSubmissionVariables } from '@firebasegen/homeschool-connector-connector';

// The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`:
const gradeSubmissionVars: GradeSubmissionVariables = {
  submissionId: ..., 
  grade: ..., 
  feedback: ..., 
};

// Call the `gradeSubmissionRef()` function to get a reference to the mutation.
const ref = gradeSubmissionRef(gradeSubmissionVars);
// Variables can be defined inline as well.
const ref = gradeSubmissionRef({ submissionId: ..., grade: ..., feedback: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = gradeSubmissionRef(dataConnect, gradeSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

