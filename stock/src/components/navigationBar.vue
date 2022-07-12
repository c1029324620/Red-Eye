<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Stock Search</a>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="#">Search</a>
          </li>
          <li>
            <a href="#">Watchlist</a>
          </li>
          <li>
            <a href='#'>Protfolio</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
};
</script>

<style>
  .navbar-inverse {
    background-color: rgb(80, 135, 231);
  }

  .navbar-inverse .navbar-brand,
  .navbar-inverse .navbar-nav>.active>a {
    color:rgb(88, 75, 75);
    background-color: rgb(80, 135, 231);
  }
  .navbar > .container .navbar-brand {
    margin-left: -150px;
  }
  .nav {
    
    padding-left: 75%;
  }
  .navbar-inverse .navbar-nav > .active > a:hover,
  .navbar-inverse .navbar-nav > .active > a:focus  {
    background-color: rgb(80, 135, 231);
    color:#fff;
  }
</style>