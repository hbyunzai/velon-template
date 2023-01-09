<template>
  <a-card>
    <a-row>
      <a-col :span="24"> 所有元素权限点数:{{ allAbilities }} </a-col>
    </a-row>

    <img v-if="has('/auth/element:img')" width="30" src="/src/assets/images/avatar.jpg" />
    <img v-if="has('img')" width="30" src="/src/assets/images/avatar.jpg" />

    <a-row>
      <a-col :span="3">
        <a-button type="primary" @click="addPoint">增加权限点数</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="removePoint">删除权限点数</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="addFullPoint">增加全量权限点数</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="removeFullPoint">删除全量权限点数</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script setup lang="ts">
import { useAcl, useAclStore } from 'velon';

const aclStore = useAclStore();
const { has } = useAcl();

const allAbilities = computed(() => {
  return new Set(aclStore.getAbilities);
});

const addPoint = () => {
  aclStore.addAbility('img');
};
const removePoint = () => {
  aclStore.removeAbility('img');
};
const addFullPoint = () => {
  aclStore.addAbility('/auth/element:img');
};
const removeFullPoint = () => {
  aclStore.removeAbility('/auth/element:img');
};
</script>
