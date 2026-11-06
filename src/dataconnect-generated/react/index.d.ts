import { GetCurrentUserData, GetMyEnrollmentsData, GetMyEnrollmentsVariables, GetClassAssignmentsData, GetClassAssignmentsVariables, CreateUserData, CreateUserVariables, CreateClassData, CreateClassVariables, CreateAssignmentData, CreateAssignmentVariables, SubmitAssignmentData, SubmitAssignmentVariables, GradeSubmissionData, GradeSubmissionVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useGetMyEnrollments(vars: GetMyEnrollmentsVariables, options?: useDataConnectQueryOptions<GetMyEnrollmentsData>): UseDataConnectQueryResult<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;
export function useGetMyEnrollments(dc: DataConnect, vars: GetMyEnrollmentsVariables, options?: useDataConnectQueryOptions<GetMyEnrollmentsData>): UseDataConnectQueryResult<GetMyEnrollmentsData, GetMyEnrollmentsVariables>;

export function useGetClassAssignments(vars: GetClassAssignmentsVariables, options?: useDataConnectQueryOptions<GetClassAssignmentsData>): UseDataConnectQueryResult<GetClassAssignmentsData, GetClassAssignmentsVariables>;
export function useGetClassAssignments(dc: DataConnect, vars: GetClassAssignmentsVariables, options?: useDataConnectQueryOptions<GetClassAssignmentsData>): UseDataConnectQueryResult<GetClassAssignmentsData, GetClassAssignmentsVariables>;

export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useCreateClass(options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;
export function useCreateClass(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;

export function useCreateAssignment(options?: useDataConnectMutationOptions<CreateAssignmentData, FirebaseError, CreateAssignmentVariables>): UseDataConnectMutationResult<CreateAssignmentData, CreateAssignmentVariables>;
export function useCreateAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAssignmentData, FirebaseError, CreateAssignmentVariables>): UseDataConnectMutationResult<CreateAssignmentData, CreateAssignmentVariables>;

export function useSubmitAssignment(options?: useDataConnectMutationOptions<SubmitAssignmentData, FirebaseError, SubmitAssignmentVariables>): UseDataConnectMutationResult<SubmitAssignmentData, SubmitAssignmentVariables>;
export function useSubmitAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitAssignmentData, FirebaseError, SubmitAssignmentVariables>): UseDataConnectMutationResult<SubmitAssignmentData, SubmitAssignmentVariables>;

export function useGradeSubmission(options?: useDataConnectMutationOptions<GradeSubmissionData, FirebaseError, GradeSubmissionVariables>): UseDataConnectMutationResult<GradeSubmissionData, GradeSubmissionVariables>;
export function useGradeSubmission(dc: DataConnect, options?: useDataConnectMutationOptions<GradeSubmissionData, FirebaseError, GradeSubmissionVariables>): UseDataConnectMutationResult<GradeSubmissionData, GradeSubmissionVariables>;
