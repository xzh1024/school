<template>
    <div>
        <h1 class="game-info">game-info</h1>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import routerService from '@/router/router.service';
import {RouterNameEnum} from '@/router/enum/RouterNameEnum';

@Component({
  components: {
      
  },
})
export default class GameInfoComponent extends Vue {
    private created() {
        console.log('game-info');
    }

    private mounted() {

    };
}
</script>

<style>
    .game-info {
        font-size: 20px;
        font-weight: bold;
        color: red;
    }
</style>