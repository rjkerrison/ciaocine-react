<section>
<form action="/auth/login" method="POST">
   <label> Username
      <input type="text" name="username">
   </label>
   <label> Password
      <input type="password" name="password">
   </label>

   <button type="submit">Submit</button>
</form>

{{#if errorMessage}}
   {{errorMessage}}
{{/if}}
<section>