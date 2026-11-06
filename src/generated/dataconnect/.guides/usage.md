# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getCurrentUser, getMyEnrollments, getClassAssignments, createUser, createClass, createAssignment, submitAssignment, gradeSubmission } from '@firebasegen/homeschool-connector-connector';


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