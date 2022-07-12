<template>
    <div class="site-wrapper">
        <div class="site-wrapper-inner">
            <div class="cover-container">
                <div class="mastehead clearfix">
                    <div class="inner">
                        <h3 class="masthead-brand">Stock Search</h3>
                        <nav>
                            <ul class="nav masthead-nav">
                                  <li><router-link to="/">Search</router-link></li>
                                   <li><router-link to="/watchlist">Watchlist</router-link></li>
                                    <li><router-link to="/portfolio">Portfolio</router-link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        </div>
    <div class="cover-container">
    <router-view></router-view>
    </div>
</template>

<script>


export default {
  name: 'app',
};
</script>

<style>
.masthead-nav .router-link-exact-active,
.masthead-nav .router-link-exact-active:hover,
.masthead-nav .router-link-exact-active:focus{
  color:#fff;
  border-bottom-color: #fff;
}
</style>