import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Assignment_Key {
  id: UUIDString;
  __typename?: 'Assignment_Key';
}

export interface Class_Key {
  id: UUIDString;
  __typename?: 'Class_Key';
}

export interface CreateAssignmentData {
  assignment_insert: Assignment_Key;
}

export interface CreateAssignmentVariables {
  title: string;
  instruction?: string | null;
  dueDate: DateString;
  classId: UUIDString;
}

export interface CreateClassData {
  class_insert: Class_Key;
}

export interface CreateClassVariables {
  name: string;
  subject: string;
  color?: string | null;
  teacherId: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  name: string;
  role: string;
  householdId?: UUIDString | null;
  gradeLevel?: string | null;
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface GetClassAssignmentsData {
  assignments: ({
    id: UUIDString;
    title: string;
    instruction?: string | null;
    dueDate: DateString;
  } & Assignment_Key)[];
}

export interface GetClassAssignmentsVariables {
  classId: UUIDString;
}

export interface GetClassDetailsData {
  class?: {
    id: UUIDString;
    name: string;
    subject: string;
    color: string;
    teacherId: string;
  } & Class_Key;
}

export interface GetClassDetailsVariables {
  classId: UUIDString;
}

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

export interface GetMyEnrollmentsVariables {
  studentId: string;
}

export interface GradeSubmissionData {
  submission_update?: Submission_Key | null;
}

export interface GradeSubmissionVariables {
  submissionId: UUIDString;
  grade: string;
  feedback: string;
}

export interface Household_Key {
  id: UUIDString;
  __typename?: 'Household_Key';
}

export interface Submission_Key {
  id: UUIDString;
  __typename?: 'Submission_Key';
}

export interface SubmitAssignmentData {
  submission_update?: Submission_Key | null;
}

export interface SubmitAssignmentVariables {
  submissionId: UUIDString;
  fileUrl: string;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetClassDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassDetailsVariables): QueryRef<GetClassDetailsData, GetClassDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetClassDetailsVariables): QueryRef<GetClassDetailsData, GetClassDetailsVariables>;
  operationName: string;
}
export const getClassDetailsRef: GetClassDetailsRef;

export function getClassDetails(vars: GetClassDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassDetailsData, GetClassDetailsVariables>;
export function getClassDetails(dc: DataConnect, vars: GetClassDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassDetailsData, GetClassDetailsVariables>;

interface GetMyEnrollmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyEnrollmentsVariables): QueryRef<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyEnrollmentsVariables): QueryRef<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;
  operationName: string;
}
export const getMyEnrollmentsRef: GetMyEnrollmentsRef;

export function getMyEnrollments(vars: GetMyEnrollmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;
export function getMyEnrollments(dc: DataConnect, vars: GetMyEnrollmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;

interface GetClassAssignmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassAssignmentsVariables): QueryRef<GetClassAssignmentsData, GetClassAssignmentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetClassAssignmentsVariables): QueryRef<GetClassAssignmentsData, GetClassAssignmentsVariables>;
  operationName: string;
}
export const getClassAssignmentsRef: GetClassAssignmentsRef;

export function getClassAssignments(vars: GetClassAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassAssignmentsData, GetClassAssignmentsVariables>;
export function getClassAssignments(dc: DataConnect, vars: GetClassAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassAssignmentsData, GetClassAssignmentsVariables>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  operationName: string;
}
export const createClassRef: CreateClassRef;

export function createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;
export function createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
  operationName: string;
}
export const createAssignmentRef: CreateAssignmentRef;

export function createAssignment(vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;
export function createAssignment(dc: DataConnect, vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface SubmitAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
  operationName: string;
}
export const submitAssignmentRef: SubmitAssignmentRef;

export function submitAssignment(vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;
export function submitAssignment(dc: DataConnect, vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;

interface GradeSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
  operationName: string;
}
export const gradeSubmissionRef: GradeSubmissionRef;

export function gradeSubmission(vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;
export function gradeSubmission(dc: DataConnect, vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;

