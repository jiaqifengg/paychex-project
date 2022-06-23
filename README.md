# paychex-project
 
➢Allow user to be identified using a unique ID assigned to each employee.
<br />&emsp;o Users that cannot be identified should not be able to use the application.
 
➢ Allow users to start a work shift.
<br />&emsp;o Do not allow users to start multiple shifts simultaneously.
 
➢ Allow users to end a work shift.
<br />&emsp;o Do not allow users to start a shift during an active shift.
 
➢ Allow users to start/end a break, but only during an active shift.
<br />&emsp;o Do not allow employees to end a shift if a break is active.
 
➢ Allow users to start/end a lunch, but only during an active shift.
<br />&emsp;o Do not allow employees to end a shift if a lunch is active.
 
➢ All shift data performed by users should be recorded and made available upon returning to
the application.

➢ (Optional) Allow new users to register themselves in the application.

➢ (Optional) Allow for two types of users in the application; administrators and non-
administrators.

➢ (Optional) Allow administrators to perform any function at any time regardless of the rules
stated previously.

➢ (Optional) Allow administrators to view a summary report section that summarizes all the
employee’s shift activity.
<br />&emsp;o (Optional) Allow administrators to filter the report data.

## How to run:
1. Download the repository with SSH
   ```git clone git@github.com:jiaqifengg/paychex-project.git```
   or your preferred method.
2. Open another terminal and ensure we are in the back correct directory (~/paychex-project). This will run the API 
   ```
   cd backend/
   flask start
   ```
2. Open another terminal and ensure we are in the correct directory (~/paychex-project)
   ```
   cd client/main/
   ```
3. Run the following to install required dependencies:
   ```
   npm install
   ```
4. Then return to the previous terminal and run the program with:
   ```
   npm start
   ```

**_Notes_**
Due to time constraints the sideNav is not functional but it exists for status updates and future implementations.

