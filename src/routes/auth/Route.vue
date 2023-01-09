<template>
  <a-card>
    <a-row>
      <a-col :span="24"> 所有可以进入的路由:{{ allRoutes }}</a-col>
    </a-row>
    <a-row>
      <a-col :span="3">
        <a-button type="primary" @click="addDashboard">添加Dashboard路由</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="removeDashboard">删除Dashboard路由</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="goToDashboard">进入Dashboard</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script setup lang="ts">
import {useAclStore, useRouterPush} from 'velon';

const {to} = useRouterPush()
const aclStore = useAclStore();

const addDashboard = () => {
  aclStore.addLink('/dashboard');
};

const removeDashboard = () => {
  aclStore.removeLink('/dashboard');
};

const goToDashboard = () => {
  to('/dashboard');
};

const allRoutes = computed(() => {
  return new Set(aclStore.getLinks);
});
</script>
