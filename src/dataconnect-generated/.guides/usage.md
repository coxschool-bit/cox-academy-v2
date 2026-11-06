# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetCurrentUser, useGetMyEnrollments, useGetClassAssignments, useCreateUser, useCreateClass, useCreateAssignment, useSubmitAssignment, useGradeSubmission } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useGetMyEnrollments(getMyEnrollmentsVars);

const { data, isPending, isSuccess, isError, error } = useGetClassAssignments(getClassAssignmentsVars);

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateClass(createClassVars);

const { data, isPending, isSuccess, isError, error } = useCreateAssignment(createAssignmentVars);

const { data, isPending, isSuccess, isError, error } = useSubmitAssignment(submitAssignmentVars);

const { data, isPending, isSuccess, isError, error } = useGradeSubmission(gradeSubmissionVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getCurrentUser, getMyEnrollments, getClassAssignments, createUser, createClass, createAssignment, submitAssignment, gradeSubmission } from '@dataconnect/generated';


// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation GetMyEnrollments:  For variables, look at type GetMyEnrollmentsVars in ../index.d.ts
const { data } = await GetMyEnrollments(dataConnect, getMyEnrollmentsVars);

// Operation GetClassAssignments:  For variables, look at type GetClassAssignmentsVars in ../index.d.ts
const { data } = await GetClassAssignments(dataConnect, getClassAssignmentsVars);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreateClass:  For variables, look at type CreateClassVars in ../index.d.ts
const { data } = await CreateClass(dataConnect, createClassVars);

// Operation CreateAssignment:  For variables, look at type CreateAssignmentVars in ../index.d.ts
const { data } = await CreateAssignment(dataConnect, createAssignmentVars);

// Operation SubmitAssignment:  For variables, look at type SubmitAssignmentVars in ../index.d.ts
const { data } = await SubmitAssignment(dataConnect, submitAssignmentVars);

// Operation GradeSubmission:  For variables, look at type GradeSubmissionVars in ../index.d.ts
const { data } = await GradeSubmission(dataConnect, gradeSubmissionVars);


```