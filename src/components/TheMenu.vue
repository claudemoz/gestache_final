<template>
    <el-menu :router="true" :default-active="activeRoute">

        <h3>GesTâche </h3>
        <p>version 1.0</p>

        <el-menu-item  index="/" >
        <el-icon><Timer /></el-icon>
        <span>Tracker</span>
        </el-menu-item>

        <el-menu-item index="/categories" disabled>
        <el-icon><Folder-opened /></el-icon>
        <span>Catégories</span>
        </el-menu-item>

        <el-sub-menu index="/settings">
            <template #title>
                <el-icon><Setting /></el-icon>
                <span>Paramètres</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/settings/app">Application</el-menu-item>
                <el-menu-item index="/settings/user">Utilisateur</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { FolderOpened,Timer, Message, Menu as IconMenu, Setting } from '@element-plus/icons-vue'

    const route = useRoute()
    let activeRoute = computed(()=>{
        if(route.path == '/home'){
            return '/'
        }else if ((route.matched[0] && route.matched[0].path =='/')){
            return '/'
        }else{
            return  route.path
        }
    })

</script>

<style  scoped>
    
.el-menu {
  border-right: none;
  position: fixed;
}

h3{
    text-align: center;
}
</style>