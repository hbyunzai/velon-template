<template>
  <a-card>
    <a-row>
      <a-col :span="24"> 所有角色:{{ allRoles }} </a-col>
    </a-row>

    <img v-if="has('teacher')" width="30" src="/src/assets/images/avatar.jpg" />

    <a-row>
      <a-col :span="3">
        <a-button type="primary" @click="addRole">增加角色</a-button>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" @click="removeRole">删除角色</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script setup lang="ts">
import { useAcl, useAclStore } from 'velon';

const aclStore = useAclStore();
const { has } = useAcl();

const allRoles = computed(() => {
  return new Set(aclStore.getRoles);
});

const addRole = () => {
  aclStore.addRole('teacher');
};
const removeRole = () => {
  aclStore.removeRole('teacher');
};
</script>
