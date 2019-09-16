const STORAGE_KEY = 'user-storage';

var users = 
[
  {id: 1, name: 'James', surename: 'Hetfield', email: 'jh@com', phone: 888888},
  {id: 2, name: 'Lars', surename: 'Ulrich', email: 'lu@com', phone: 777777},
  {id: 3, name: 'Kirk', surename: 'Hammett', email: 'kh@com', phone: 111111},
  {id: 4, name: 'Roberto', surename: 'Trujillo', email: 'rt@com', phone: 222222}
];

function findUser (userId) 
{
  return users[findUserKey(userId)];
};

function findUserKey (userId) 
{
  for (var key = 0; key < users.length; key++) 
  {
    if (users[key].id == userId) 
    {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#user-list',
  data: function () {
    return {
      users: users, 
      searchKey: ''
    };
  },
  created () {
    this.user = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
});

var UserEdit = Vue.extend({
  template: '#user-edit',
  data: function () {
    return {
      user: findUser(this.$route.params.user_id)
    };
  },
  methods: {
    updateUser: function () 
    {
      var user = this.$get('user');
      users[findUserKey(user.id)] = 
      {
        id: user.id,
        name: user.name,
        surename: user.surename,
        email: user.email,
        phone: user.phone,
        text: json.text
      };
      router.go('/');
    }
  }
});

var UserDelete = Vue.extend({
  template: '#user-delete',
  data: function () 
  {
    return {
      user: findUser(this.$route.params.user_id)
    };
  },
  methods: {
    deleteUser: function () 
    {
      users.splice(findUserKey(this.$route.params.user_id), 1);
      router.go('/');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
    }
  }
});

var AddUser = Vue.extend({
  template: '#add-user',
  data: function () 
  {
    return {
      user: 
      {
        name: '',
        surename: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    createUser: function() 
    {
      var user = this.$get('user');
      users.push({
        id: Math.random().toString().split('.')[1],
        name: user.name,
        surename: user.surename,
        email: user.email,
        phone: user.phone
      });
      router.go('/');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
});

var ImportJson = Vue.extend({
  template: '#import-json',
  data: function () {
    return {
      json:
      {
        text: ''
      }
    }
  },
  methods:
  {
    importJson: function() {
      var json = this.$get('json');
      users.push({
        id: Math.random().toString().split('.')[1],
        text: json.text
      });

      router.go('/import-json');
    }
  }
})

var router = new VueRouter();
router.map({
  '/': 
  {
    component: List
  },
  '/add-user': 
  {
    component: AddUser
  },
  '/import-json':
  {
    component: ImportJson
  },
  '/user/:user_id/edit': 
  {
    component: UserEdit, 
    name: 'user-edit'
  },
  '/user/:user_id/delete': 
  {
    component: UserDelete, 
    name: 'user-delete'
  }

})
  .start(Vue.extend({}), '#app');