export default {
        //tutorial

tutorial: [

        //centerline
        {start: {"2,6":"amber","3,6":"amber"},
        target: {"2,6":"amber","3,6":"amber","4,1":"amber","4,2":"amber"},
        folds: 1},

        //centerline
        {start: {"6,7":"red","6,9":"red","7,8":"red","6,8":"red"},
        target: {"6,7":"red","6,9":"red","7,8":"red","6,8":"red","3,7":"red","3,9":"red","2,8":"red","3,8":"red"},
        folds: 1},

        //overlap
        {start: {"3,0":"green","4,1":"green","4,3":"green","3,3":"green","3,2":"green","4,4":"green","3,1":"red"},
        target: {"3,0":"green","4,1":"green","4,3":"green","3,3":"green","3,2":"green","4,4":"green","3,1":"red","5,7":"green","5,5":"green","4,5":"green","4,6":"green","5,6":"red"},
        folds: 1},

        //overlap
        {start: {"2,5":"dkblue","3,7":"dkblue","4,8":"dkblue","2,6":"dkblue","3,6":"dkblue","4,7":"green"},
        target: {"2,5":"dkblue","3,7":"dkblue","4,8":"dkblue","2,6":"dkblue","3,6":"dkblue","4,7":"green","3,9":"dkblue","3,4":"dkblue","3,8":"dkblue","3,5":"green"},
        folds: 1},

        //regular regular
        {start: {"6,4":"dkblue","6,2":"dkblue","7,5":"dkblue","7,3":"dkblue","7,2":"green","7,4":"green"},
        target: {"6,4":"dkblue","6,2":"dkblue","7,5":"dkblue","7,3":"dkblue","7,2":"green","7,4":"green","5,8":"dkblue","4,9":"dkblue","6,9":"dkblue","5,10":"dkblue","4,10":"green","5,9":"green","1,4":"dkblue","1,2":"dkblue","0,5":"dkblue","0,3":"dkblue","0,2":"green","0,4":"green","2,8":"dkblue","3,9":"dkblue","1,9":"dkblue","2,10":"dkblue","3,10":"green","2,9":"green"},
        folds: 2},

        //overlap then regular
        {start: {"4,1":"green","3,0":"red","3,1":"red","3,2":"red","2,2":"red"},
        target: {"4,1":"green","3,0":"red","3,1":"red","3,2":"red","2,2":"red","1,1":"green","2,0":"red","2,1":"red","1,9":"green","0,8":"red","1,8":"red","1,7":"red","1,6":"red","0,5":"green","0,7":"red","0,6":"red"},
        folds: 2},

        //regular then overlap
        {start: {"1,7":"green","1,5":"green","1,8":"green","1,6":"green"},
        target: {"1,7":"green","1,5":"green","1,8":"green","1,6":"green","3,2":"green","2,3":"green","3,1":"green","2,2":"green","2,7":"green","0,6":"green","4,6":"green","3,7":"green","5,6":"green","4,7":"green"},
        folds: 2},

        //plan then overlap (hardish)
        {start: {"3,1":"dkblue","4,0":"red","5,0":"red","4,1":"red"},
        target: {"3,1":"dkblue","4,0":"red","5,0":"red","4,1":"red","5,6":"dkblue","6,5":"red","6,4":"red","5,5":"red","6,1":"dkblue","5,1":"red","4,6":"dkblue","3,5":"red","3,4":"red","4,5":"red"},
        folds: 2},

        //three
        {start: {"4,1":"dkblue","4,0":"dkblue","4,3":"green","4,2":"green"},
        target: {"4,1":"dkblue","4,0":"dkblue","4,3":"green","4,2":"green","3,1":"dkblue","3,0":"dkblue","3,3":"green","3,2":"green","5,1":"dkblue","5,0":"dkblue","5,3":"green","5,2":"green","6,1":"dkblue","6,0":"dkblue","6,3":"green","6,2":"green","2,6":"dkblue","2,7":"dkblue","3,5":"green","3,6":"green","2,5":"dkblue","1,5":"dkblue","3,4":"green","2,4":"green","3,8":"dkblue","2,8":"dkblue","4,7":"green","3,7":"green","3,9":"dkblue","3,10":"dkblue","4,8":"green","4,9":"green"},
        folds: 3},
        
        //three
        {start: {"5,3":"dkblue","6,3":"green","6,6":"red","6,5":"red","6,4":"red"},
        target: {"5,3":"dkblue","6,3":"green","6,6":"red","6,5":"red","6,4":"red","5,4":"dkblue","5,5":"green","7,4":"red","4,7":"dkblue","4,8":"green","6,7":"red","5,7":"red","5,8":"red","4,6":"dkblue","5,6":"green","5,9":"red","2,3":"dkblue","1,3":"green","1,6":"red","1,5":"red","1,4":"red","2,4":"dkblue","2,5":"green","0,4":"red","3,7":"dkblue","3,8":"green","1,7":"red","2,7":"red","2,8":"red","3,6":"dkblue","2,6":"green","2,9":"red"},
        folds: 3},

],

easy: [

        { start: {"2,1":"red","2,2":"red","2,3":"red","2,4":"red","3,4":"red","3,5":"red","4,5":"red"},
        target: {"2,1":"red","2,2":"red","2,3":"red","2,4":"red","3,4":"red","3,5":"red","4,5":"red","4,8":"red","4,7":"red","3,7":"red","3,6":"red","3,3":"red"},
        folds: 1 },

        { start: {"2,1":"green","2,2":"green","3,2":"green","3,3":"red","3,4":"red","3,5":"red"},
        target: {"2,1":"green","2,2":"green","3,2":"green","3,3":"red","3,4":"red","3,5":"red","1,3":"green","2,3":"green","2,4":"green","4,3":"red"},
        folds: 1 },

        { start: {"1,5":"purple","2,5":"purple","4,8":"purple","5,8":"purple","5,7":"purple","2,6":"purple","3,6":"purple","5,9":"purple"},
        target: {"1,5":"purple","2,5":"purple","4,8":"purple","5,8":"purple","5,7":"purple","2,6":"purple","3,6":"purple","5,9":"purple","3,10":"purple","3,9":"purple","3,4":"purple","3,3":"purple","4,3":"purple","3,8":"purple","3,7":"purple","3,2":"purple"},
        folds: 1 },

        { start: {"0,5":"green","0,6":"green","1,6":"green","1,5":"green","2,5":"red","2,4":"red","3,4":"red","3,5":"red"},
        target: {"0,5":"green","0,6":"green","1,6":"green","1,5":"green","2,5":"red","2,4":"red","3,4":"red","3,5":"red","1,1":"green","2,1":"green","2,2":"green","2,3":"green","2,6":"red","3,6":"red"},
        folds: 1 },

        { start: {"2,0":"dkblue","2,1":"dkblue","2,2":"dkblue","3,2":"dkblue","3,1":"dkblue","4,1":"dkblue","4,2":"dkblue","5,2":"dkblue","5,3":"dkblue","5,4":"dkblue","4,4":"dkblue","4,5":"dkblue"},
        target: {"2,0":"dkblue","2,1":"dkblue","2,2":"dkblue","3,2":"dkblue","3,1":"dkblue","4,1":"dkblue","4,2":"dkblue","5,2":"dkblue","5,3":"dkblue","5,4":"dkblue","4,4":"dkblue","4,5":"dkblue","5,8":"dkblue","4,8":"dkblue","4,7":"dkblue","4,6":"dkblue","5,6":"dkblue","5,5":"dkblue","4,3":"dkblue","3,3":"dkblue"},
        folds: 1 },

        { start: {"2,2":"green","2,3":"green","2,4":"green","1,3":"green","1,2":"green","1,1":"green","2,1":"green","1,0":"green","5,4":"red","5,5":"red","4,3":"red","4,2":"red","5,2":"red","5,3":"red","4,4":"red","4,1":"red"},
        target: {"2,2":"green","2,3":"green","2,4":"green","1,3":"green","1,2":"green","1,1":"green","2,1":"green","1,0":"green","5,4":"red","5,5":"red","4,3":"red","4,2":"red","5,2":"red","5,3":"red","4,4":"red","4,1":"red","3,4":"green","2,5":"green","2,6":"green","3,6":"green","3,5":"green","3,7":"green","3,-1":"red","3,-2":"red","3,1":"red","4,0":"red","4,-1":"red","3,0":"red"},
        folds: 1 },

        { start: {"3,2":"dkblue","2,2":"dkblue","2,3":"dkblue","5,2":"green","5,1":"green","5,3":"green"},
        target: {"3,2":"dkblue","2,2":"dkblue","2,3":"dkblue","5,2":"green","5,1":"green","5,3":"green","6,2":"dkblue","7,2":"dkblue","7,3":"dkblue","4,2":"green","4,1":"green","4,3":"green"},
        folds: 1 },

        {start: {"4,7":"dkblue","3,7":"dkblue","2,3":"dkblue","3,6":"dkblue","2,6":"dkblue","1,5":"red","3,8":"red","2,5":"amber","2,4":"amber"},
        target: {"4,7":"dkblue","3,7":"dkblue","2,3":"dkblue","3,6":"dkblue","2,6":"dkblue","1,5":"red","3,8":"red","2,5":"amber","2,4":"amber","1,7":"dkblue","2,7":"dkblue","3,3":"dkblue","4,5":"red","2,8":"red","3,5":"amber","3,4":"amber"},
        folds: 1},

        { start: {"1,1":"red","2,1":"red","2,2":"red","3,2":"red","4,3":"red","3,3":"red","2,4":"green","3,4":"green","3,5":"green","4,5":"green","4,6":"green"},
        target: {"1,1":"red","2,1":"red","2,2":"red","3,2":"red","4,3":"red","3,3":"red","2,4":"green","3,4":"green","3,5":"green","4,5":"green","4,6":"green","6,1":"red","5,1":"red","5,2":"red","4,2":"red","5,4":"green","4,4":"green","3,6":"green"},
        folds: 1 },

        { start: {"3,1":"amber","4,1":"amber","4,2":"amber","5,2":"amber","5,1":"amber","5,3":"amber","4,4":"amber"},
        target: {"3,1":"amber","4,1":"amber","4,2":"amber","5,2":"amber","5,1":"amber","5,3":"amber","4,4":"amber","3,2":"amber","2,2":"amber","2,1":"amber","2,3":"amber","3,4":"amber"},
        folds: 1 },

        {start: {"3,8":"dkblue","1,7":"dkblue","1,4":"dkblue","0,4":"dkblue","2,7":"dkblue","1,6":"dkblue","2,8":"dkblue","0,5":"amber","0,6":"amber"},
        target: {"3,8":"dkblue","1,7":"dkblue","1,4":"dkblue","0,4":"dkblue","2,7":"dkblue","1,6":"dkblue","2,8":"dkblue","0,5":"amber","0,6":"amber","0,8":"dkblue","2,4":"dkblue","3,4":"dkblue","2,6":"dkblue","1,8":"dkblue","3,5":"amber","3,6":"amber"},
        folds: 1},

        { start: {"3,2":"red","3,1":"red","4,1":"red","4,5":"red","4,4":"red","5,4":"red"},
        target: {"3,2":"red","3,1":"red","4,1":"red","4,5":"red","4,4":"red","5,4":"red","3,3":"red","5,1":"red","5,2":"red","5,3":"red"},
        folds: 1 },

        { start: {"1,1":"red","1,2":"red","0,2":"red","1,5":"purple","2,5":"purple","1,4":"purple","1,6":"purple"},
        target: {"1,1":"red","1,2":"red","0,2":"red","1,5":"purple","2,5":"purple","1,4":"purple","1,6":"purple","2,1":"red","2,2":"red","3,2":"red","2,4":"purple","2,6":"purple"},
        folds: 1 },

        { start: {"1,4":"dkblue","1,5":"dkblue","1,6":"dkblue","1,7":"dkblue","2,7":"dkblue","3,6":"dkblue","2,6":"dkblue","3,5":"dkblue","4,5":"dkblue","4,6":"dkblue","4,7":"dkblue","4,8":"dkblue"},
        target: {"1,4":"dkblue","1,5":"dkblue","1,6":"dkblue","1,7":"dkblue","2,7":"dkblue","3,6":"dkblue","2,6":"dkblue","3,5":"dkblue","4,5":"dkblue","4,6":"dkblue","4,7":"dkblue","4,8":"dkblue","3,11":"dkblue","3,10":"dkblue","2,10":"dkblue","2,9":"dkblue","2,8":"dkblue","3,7":"dkblue","3,8":"dkblue","3,4":"dkblue"},
        folds: 1 },

        { start: {"2,2":"purple","2,3":"purple","2,4":"purple","5,3":"purple","6,3":"purple","6,2":"purple"},
        target: {"2,2":"purple","2,3":"purple","2,4":"purple","5,3":"purple","6,3":"purple","6,2":"purple","5,10":"purple","4,10":"purple","4,9":"purple","6,5":"purple","6,4":"purple","7,4":"purple"},
        folds: 1 },

        {start: {"2,6":"red","5,9":"red","5,8":"purple","3,6":"purple","3,5":"purple","4,7":"purple","4,8":"purple","3,7":"purple"},
        target: {"2,6":"red","5,9":"red","5,8":"purple","3,6":"purple","3,5":"purple","4,7":"purple","4,8":"purple","3,7":"purple","7,6":"red","4,9":"red","6,6":"purple","6,5":"purple","5,7":"purple","6,7":"purple"},
        folds: 1},

        {start: {"2,8":"green","3,5":"green","3,7":"green","3,9":"green","3,8":"green","3,6":"green","2,6":"green"},
        target: {"2,8":"green","3,5":"green","3,7":"green","3,9":"green","3,8":"green","3,6":"green","2,6":"green","2,9":"green","4,7":"green","2,7":"green"},
        folds: 1},

        { start: {"3,1":"dkblue","4,1":"dkblue","4,2":"dkblue","5,8":"dkblue","4,8":"dkblue","4,9":"dkblue","4,3":"dkblue"},
        target: {"3,1":"dkblue","4,1":"dkblue","4,2":"dkblue","5,8":"dkblue","4,8":"dkblue","4,9":"dkblue","4,3":"dkblue","6,9":"dkblue","6,8":"dkblue","6,7":"dkblue","3,3":"dkblue","3,4":"dkblue","2,4":"dkblue","5,7":"dkblue"},
        folds: 1 },

        { start: {"3,-1":"green","4,-1":"green","4,0":"green","5,0":"green","5,1":"green","3,2":"green","3,3":"green","4,3":"green","4,4":"green","5,4":"green"},
        target: {"3,-1":"green","4,-1":"green","4,0":"green","5,0":"green","5,1":"green","3,2":"green","3,3":"green","4,3":"green","4,4":"green","5,4":"green","2,3":"green","2,4":"green","3,4":"green","3,5":"green","4,5":"green","3,1":"green","4,1":"green","4,2":"green","5,2":"green","5,3":"green"},
        folds: 1 },

        {start: {"7,2":"dkblue","6,2":"purple","4,5":"purple","5,3":"purple","6,3":"purple","4,4":"purple","5,4":"purple"},
        target: {"7,2":"dkblue","6,2":"purple","4,5":"purple","5,3":"purple","6,3":"purple","4,4":"purple","5,4":"purple","5,7":"dkblue","5,6":"purple","5,1":"purple","5,5":"purple","5,2":"purple"},
        folds: 1},

        { start: {"1,5":"red","2,5":"red","2,6":"red","4,4":"red","5,4":"red","5,3":"red","4,5":"red","4,6":"red"},
        target: {"1,5":"red","2,5":"red","2,6":"red","4,4":"red","5,4":"red","5,3":"red","4,5":"red","4,6":"red","6,5":"red","5,5":"red","5,6":"red","3,4":"red","2,4":"red","2,3":"red","3,5":"red","3,6":"red"},
        folds: 1 },

        { start: {"2,1":"green","2,0":"green","3,0":"green","3,1":"green","4,1":"green","4,2":"green","4,3":"green","4,4":"green","3,5":"green","4,5":"green"},
        target: {"2,1":"green","2,0":"green","3,0":"green","3,1":"green","4,1":"green","4,2":"green","4,3":"green","4,4":"green","3,5":"green","4,5":"green","4,8":"green","5,8":"green","5,7":"green","5,6":"green","5,5":"green","5,4":"green","3,4":"green","3,3":"green"},
        folds: 1 },

        { start: {"1,5":"dkblue","2,5":"dkblue","2,4":"dkblue","3,4":"dkblue","3,3":"dkblue","3,2":"dkblue","4,6":"dkblue","5,6":"dkblue","5,5":"dkblue","5,4":"dkblue"},
        target: {"1,5":"dkblue","2,5":"dkblue","2,4":"dkblue","3,4":"dkblue","3,3":"dkblue","3,2":"dkblue","4,6":"dkblue","5,6":"dkblue","5,5":"dkblue","5,4":"dkblue","3,10":"dkblue","3,9":"dkblue","4,9":"dkblue","4,8":"dkblue","5,8":"dkblue","5,9":"dkblue","4,5":"dkblue","4,4":"dkblue"},
        folds: 1 },

        {start: {"0,0":"red","1,3":"red","2,-1":"red","1,4":"red","1,2":"purple","1,1":"purple","1,-1":"purple","1,0":"purple"},
        target: {"0,0":"red","1,3":"red","2,-1":"red","1,4":"red","1,2":"purple","1,1":"purple","1,-1":"purple","1,0":"purple","0,1":"red","2,1":"red","0,4":"red","2,0":"red","0,3":"purple","0,2":"purple"},
        folds: 1},

        { start: {"3,1":"green","3,0":"green","2,0":"green","2,1":"green","2,2":"green","3,5":"green","3,6":"green","4,5":"green","4,6":"green","3,7":"green"},
        target: {"3,1":"green","3,0":"green","2,0":"green","2,1":"green","2,2":"green","3,5":"green","3,6":"green","4,5":"green","4,6":"green","3,7":"green","5,6":"green","5,7":"green","5,8":"green","4,8":"green","4,7":"green","3,4":"green","2,4":"green","3,3":"green","3,2":"green","2,3":"green"},
        folds: 1 },

        {start: {"3,7":"dkblue","3,6":"purple","3,2":"purple","3,5":"purple","3,3":"purple","2,4":"purple","3,4":"purple"},
        target: {"3,7":"dkblue","3,6":"purple","3,2":"purple","3,5":"purple","3,3":"purple","2,4":"purple","3,4":"purple","2,3":"dkblue","4,6":"purple","4,5":"purple"},
        folds: 1},

        {start: {"5,6":"red","4,4":"red","4,8":"purple","4,5":"purple","5,8":"purple","4,6":"purple","3,7":"purple","4,7":"purple"},
        target: {"5,6":"red","4,4":"red","4,8":"purple","4,5":"purple","5,8":"purple","4,6":"purple","3,7":"purple","4,7":"purple","2,6":"red","3,4":"red","3,8":"purple","3,5":"purple","2,8":"purple","3,6":"purple"},
        folds: 1},

        {start: {"3,8":"dkblue","2,8":"dkblue","2,9":"dkblue","1,7":"dkblue","2,7":"dkblue","2,10":"dkblue","2,6":"dkblue"},
        target: {"3,8":"dkblue","2,8":"dkblue","2,9":"dkblue","1,7":"dkblue","2,7":"dkblue","2,10":"dkblue","2,6":"dkblue","3,9":"dkblue","4,7":"dkblue","3,7":"dkblue","3,10":"dkblue","3,6":"dkblue"},
        folds: 1},

        { start: {"3,5":"purple","4,5":"purple","2,3":"purple","1,3":"purple","3,7":"purple","4,7":"purple"},
        target: {"3,5":"purple","4,5":"purple","2,3":"purple","1,3":"purple","3,7":"purple","4,7":"purple","2,5":"purple","1,5":"purple","3,3":"purple","4,3":"purple","2,7":"purple","1,7":"purple"},
        folds: 1 },

        { start: {"4,6":"green","5,6":"green","5,7":"green","5,8":"green","4,8":"green","2,4":"green","2,3":"green","2,2":"green","3,2":"green","3,3":"green","3,1":"green","4,5":"green"},
        target: {"4,6":"green","5,6":"green","5,7":"green","5,8":"green","4,8":"green","2,4":"green","2,3":"green","2,2":"green","3,2":"green","3,3":"green","3,1":"green","4,5":"green","6,1":"green","6,2":"green","7,2":"green","7,1":"green","7,0":"green","4,-1":"green","3,-1":"green","3,0":"green","4,1":"green","5,1":"green"},
        folds: 1 },

        { start: {"4,1":"green","4,0":"green","4,-1":"green","2,4":"green","2,5":"green","2,6":"green","5,1":"green","6,1":"green","6,2":"green","2,3":"green","2,2":"green","2,1":"green"},
        target: {"4,1":"green","4,0":"green","4,-1":"green","2,4":"green","2,5":"green","2,6":"green","5,1":"green","6,1":"green","6,2":"green","2,3":"green","2,2":"green","2,1":"green","4,2":"green","5,2":"green","5,3":"green","1,3":"green","1,2":"green","5,0":"green","5,-1":"green","5,-2":"green","3,4":"green","3,5":"green"},
        folds: 1 },

        { start: {"2,3":"dkblue","2,4":"dkblue","2,5":"dkblue","2,6":"dkblue","3,6":"dkblue","3,7":"dkblue","4,7":"dkblue","4,6":"dkblue","5,6":"dkblue","5,4":"dkblue","5,5":"dkblue","4,4":"dkblue"},
        target: {"2,3":"dkblue","2,4":"dkblue","2,5":"dkblue","2,6":"dkblue","3,6":"dkblue","3,7":"dkblue","4,7":"dkblue","4,6":"dkblue","5,6":"dkblue","5,4":"dkblue","5,5":"dkblue","4,4":"dkblue","1,3":"dkblue","1,2":"dkblue","1,1":"dkblue","1,0":"dkblue","1,-1":"dkblue","2,-1":"dkblue","2,-2":"dkblue","3,-1":"dkblue","3,-2":"dkblue","3,0":"dkblue"},
        folds: 1 },

        { start: {"1,3":"red","1,4":"red","1,5":"red","1,6":"red","2,0":"dkblue","2,1":"dkblue","2,2":"dkblue","2,3":"dkblue"},
        target: {"1,3":"red","1,4":"red","1,5":"red","1,6":"red","2,0":"dkblue","2,1":"dkblue","2,2":"dkblue","2,3":"dkblue","2,5":"red","0,4":"red","4,5":"dkblue","3,5":"dkblue","3,4":"dkblue","2,4":"dkblue"},
        folds: 1 },

        {start: {"0,6":"red","2,5":"red","2,7":"red","1,7":"red","0,8":"purple","1,6":"purple","1,5":"purple","1,8":"purple"},
        target: {"0,6":"red","2,5":"red","2,7":"red","1,7":"red","0,8":"purple","1,6":"purple","1,5":"purple","1,8":"purple","1,4":"red","2,6":"red","2,3":"purple","2,4":"purple"},
        folds: 1},

        { start: {"3,2":"green","5,2":"green","5,6":"green","3,6":"green","3,7":"green","2,2":"green","5,5":"green","5,1":"green"},
        target: {"3,2":"green","5,2":"green","5,6":"green","3,6":"green","3,7":"green","2,2":"green","5,5":"green","5,1":"green","3,1":"green","4,4":"green","6,2":"green","5,-1":"green","6,-1":"green","3,0":"green","6,3":"green","4,5":"green"},
        folds: 1 },

        {start: {"3,1":"dkblue","3,2":"dkblue","2,2":"dkblue","3,0":"purple","2,3":"purple","1,3":"purple"},
        target: {"3,1":"dkblue","3,2":"dkblue","2,2":"dkblue","3,0":"purple","2,3":"purple","1,3":"purple","0,1":"dkblue","0,2":"dkblue","1,2":"dkblue","0,0":"purple"},
        folds: 1},


],

        medium: [

        { start: {"4,6":"dkblue","5,10":"dkblue","5,9":"dkblue","6,5":"dkblue","5,5":"green","5,8":"green","5,7":"green","5,6":"green"},
        target: {"4,6":"dkblue","5,10":"dkblue","5,9":"dkblue","6,5":"dkblue","5,5":"green","5,8":"green","5,7":"green","5,6":"green","3,6":"dkblue","2,10":"dkblue","2,9":"dkblue","1,5":"dkblue","2,5":"green","2,8":"green","2,7":"green","2,6":"green","4,7":"dkblue","6,6":"dkblue","6,7":"dkblue","4,10":"dkblue","4,9":"green","4,8":"green","3,5":"dkblue","5,2":"dkblue","4,2":"dkblue","2,3":"dkblue","2,4":"green","4,3":"green","3,3":"green","3,4":"green"},
        folds: 2 },

        { start: {"1,6":"dkblue","2,7":"dkblue","3,10":"dkblue","2,10":"dkblue","2,9":"green","1,8":"green","1,9":"green","1,7":"green"},
        target: {"1,6":"dkblue","2,7":"dkblue","3,10":"dkblue","2,10":"dkblue","2,9":"green","1,8":"green","1,9":"green","1,7":"green","1,5":"dkblue","2,6":"dkblue","4,6":"dkblue","4,5":"dkblue","3,5":"green","2,4":"green","3,4":"green","2,5":"green","2,8":"dkblue","3,8":"dkblue","4,7":"green","4,9":"green","4,8":"green","3,9":"green"},
        folds: 2 },

        {start: {"5,0":"red","5,1":"red","6,3":"purple","4,4":"purple","5,4":"purple","5,2":"purple","4,2":"purple","5,3":"purple"},
        target: {"5,0":"red","5,1":"red","6,3":"purple","4,4":"purple","5,4":"purple","5,2":"purple","4,2":"purple","5,3":"purple","7,7":"red","7,6":"red","6,4":"purple","5,6":"purple","5,5":"purple","6,6":"purple","6,7":"purple","6,5":"purple","6,0":"red","6,1":"red","7,4":"purple","6,2":"purple","7,2":"purple","4,7":"red","4,6":"red","5,7":"purple"},
        folds: 2},

        { start: {"2,2":"dkblue","4,4":"dkblue","5,4":"dkblue","3,2":"dkblue","4,3":"green","3,1":"green","4,1":"red","3,3":"red"},
        target: {"2,2":"dkblue","4,4":"dkblue","5,4":"dkblue","3,2":"dkblue","4,3":"green","3,1":"green","4,1":"red","3,3":"red","2,3":"dkblue","4,5":"dkblue","4,6":"dkblue","2,4":"dkblue","3,5":"green","2,5":"green","2,6":"red","3,4":"red","5,10":"dkblue","5,6":"dkblue","5,5":"dkblue","5,9":"dkblue","5,7":"green","6,9":"green","6,8":"red","5,8":"red","4,10":"dkblue","4,9":"dkblue","4,7":"green","3,9":"green","3,8":"red","4,8":"red"},
        folds: 2 },

        { start: {"5,10":"green","4,11":"green","3,8":"green","3,9":"red","4,10":"red","4,9":"red"},
        target: {"5,10":"green","4,11":"green","3,8":"green","3,9":"red","4,10":"red","4,9":"red","2,10":"green","3,11":"green","4,8":"green","3,10":"red","2,2":"green","1,3":"green","2,6":"green","2,5":"red","2,3":"red","2,4":"red","1,6":"green","1,4":"green","3,4":"green","1,5":"red"},
        folds: 2 },

        { start: {"0,4":"green","0,5":"green","1,6":"green","1,5":"green","1,4":"green","4,2":"red","4,1":"red","4,0":"red","5,2":"red"},
        target: {"0,4":"green","0,5":"green","1,6":"green","1,5":"green","1,4":"green","4,2":"red","4,1":"red","4,0":"red","5,2":"red","5,4":"green","5,5":"green","4,6":"green","4,5":"green","4,4":"green","1,2":"red","1,1":"red","1,0":"red","0,2":"red","7,4":"green","7,5":"green","6,6":"green","6,5":"green","6,4":"green","3,2":"red","3,1":"red","3,0":"red","2,2":"red","2,4":"green","2,5":"green","3,6":"green","3,5":"green","3,4":"green","6,2":"red","6,1":"red","6,0":"red","7,2":"red"},
        folds: 2 },

        { start: {"1,1":"amber","1,2":"amber","1,3":"amber","2,3":"red","2,4":"red","2,5":"red"},
        target: {"1,1":"amber","1,2":"amber","1,3":"amber","2,3":"red","2,4":"red","2,5":"red","6,1":"amber","6,2":"amber","6,3":"amber","5,3":"red","5,4":"red","5,5":"red","4,9":"amber","3,9":"amber","3,8":"amber","3,7":"red","3,6":"red","2,6":"red","5,1":"amber","5,2":"red","4,2":"red","4,1":"red"},
        folds: 2 },

        {start: {"1,2":"dkblue","0,6":"dkblue","0,4":"dkblue","0,5":"dkblue","0,0":"red","0,1":"red","0,3":"red","0,2":"red"},
        target: {"1,2":"dkblue","0,6":"dkblue","0,4":"dkblue","0,5":"dkblue","0,0":"red","0,1":"red","0,3":"red","0,2":"red","2,6":"dkblue","1,6":"dkblue","3,8":"red","2,8":"red","1,7":"red","2,7":"red","2,2":"dkblue","3,6":"dkblue","3,4":"dkblue","3,5":"dkblue","3,0":"red","3,1":"red","3,3":"red","3,2":"red","0,8":"red","1,8":"red"},
        folds: 2 },

        {start: {"4,8":"dkblue","4,7":"dkblue","4,4":"dkblue","4,5":"red","5,8":"red","4,6":"red"},
        target: {"4,8":"dkblue","4,7":"dkblue","4,4":"dkblue","4,5":"red","5,8":"red","4,6":"red","3,4":"dkblue","3,5":"dkblue","5,6":"dkblue","3,3":"red","2,1":"dkblue","2,2":"dkblue","4,3":"dkblue","2,0":"red","3,2":"red","3,1":"dkblue"},
        folds: 2},

        {start: {"3,4":"dkblue","3,8":"dkblue","3,5":"green","4,5":"green","3,6":"green","3,7":"green"},
        target: {"3,4":"dkblue","3,8":"dkblue","3,5":"green","4,5":"green","3,6":"green","3,7":"green","6,4":"dkblue","6,8":"dkblue","6,5":"green","5,5":"green","6,6":"green","6,7":"green","4,8":"dkblue","2,6":"dkblue","4,7":"green","4,6":"green","6,3":"dkblue","4,1":"dkblue","5,3":"green","5,4":"green","5,2":"green","4,2":"green"},
        folds: 2},

        {start: {"4,-3":"dkblue","3,-1":"dkblue","4,-2":"green","4,2":"green","4,-1":"red","3,1":"red","4,1":"red","4,0":"red"},
        target: {"4,-3":"dkblue","3,-1":"dkblue","4,-2":"green","4,2":"green","4,-1":"red","3,1":"red","4,1":"red","4,0":"red","1,5":"dkblue","2,3":"dkblue","2,5":"green","4,3":"green","2,4":"red","3,2":"red","3,3":"red","3,4":"red","7,7":"dkblue","6,7":"dkblue","7,6":"green","5,4":"green","6,6":"red","5,6":"red","5,5":"red","6,5":"red","2,7":"dkblue","3,7":"dkblue","2,6":"green","4,4":"green","3,6":"red","4,6":"red","4,5":"red","3,5":"red"},
        folds: 2},

        {start: {"3,11":"red","4,6":"red","4,7":"purple","5,10":"purple","4,8":"purple","4,10":"purple","4,9":"purple","4,11":"purple"},
        target: {"3,11":"red","4,6":"red","4,7":"purple","5,10":"purple","4,8":"purple","4,10":"purple","4,9":"purple","4,11":"purple","2,7":"red","5,8":"red","3,5":"purple","3,6":"purple","3,7":"purple","2,6":"purple","7,0":"red","5,4":"red","5,3":"purple","7,3":"purple","6,3":"purple","7,2":"purple","6,2":"purple","7,1":"purple","4,0":"red","6,4":"red","4,3":"purple","4,2":"purple","5,2":"purple","4,1":"purple"},
        folds: 2},

        {start: {"6,4":"dkblue","7,3":"dkblue","7,4":"green","6,6":"green","7,6":"red","7,5":"red","7,7":"red","7,8":"red"},
        target: {"6,4":"dkblue","7,3":"dkblue","7,4":"green","6,6":"green","7,6":"red","7,5":"red","7,7":"red","7,8":"red","3,4":"dkblue","2,3":"dkblue","2,4":"green","3,6":"green","2,6":"red","2,5":"red","2,7":"red","2,8":"red","5,8":"dkblue","5,10":"dkblue","5,9":"green","6,7":"green","6,8":"red","6,9":"red","3,3":"dkblue","2,2":"dkblue","3,2":"green","4,2":"green","4,1":"red","3,1":"red","4,0":"red","5,0":"red"},
        folds: 2},

        {start: {"2,7":"dkblue","2,8":"dkblue","2,6":"dkblue","1,5":"red","2,4":"red","2,5":"red"},
        target: {"2,7":"dkblue","2,8":"dkblue","2,6":"dkblue","1,5":"red","2,4":"red","2,5":"red","1,7":"dkblue","1,8":"dkblue","1,6":"dkblue","1,4":"red","3,3":"dkblue","4,3":"dkblue","3,4":"dkblue","2,3":"red","3,2":"dkblue","3,1":"dkblue","2,2":"dkblue","1,3":"red"},
        folds: 2},

        {start: {"1,5":"dkblue","3,2":"dkblue","2,6":"purple","2,5":"purple","2,2":"purple","3,4":"purple","2,3":"purple","2,4":"purple"},
        target: {"1,5":"dkblue","3,2":"dkblue","2,6":"purple","2,5":"purple","2,2":"purple","3,4":"purple","2,3":"purple","2,4":"purple","2,7":"dkblue","4,6":"dkblue","4,7":"purple","3,5":"purple","3,7":"purple","3,6":"purple","3,10":"dkblue","5,9":"dkblue","3,8":"purple","3,9":"purple","5,10":"purple","4,8":"purple","4,10":"purple","4,9":"purple","2,8":"dkblue","4,5":"dkblue"},
        folds: 2},

        {start: {"3,8":"green","3,7":"green","3,6":"green","1,5":"red","2,6":"red","2,5":"red"},
        target: {"3,8":"green","3,7":"green","3,6":"green","1,5":"red","2,6":"red","2,5":"red","0,0":"green","1,0":"green","1,1":"green","1,4":"red","1,2":"red","1,3":"red","0,8":"green","0,7":"green","0,6":"green","1,6":"red","3,0":"green","2,0":"green","2,1":"green","2,4":"red","2,2":"red","2,3":"red"},
        folds: 2},

        {start: {"2,8":"green","4,11":"green","2,7":"green","3,8":"red","4,10":"red","3,9":"red","4,9":"red"},
        target: {"2,8":"green","4,11":"green","2,7":"green","3,8":"red","4,10":"red","3,9":"red","4,9":"red","4,3":"green","6,4":"green","3,3":"green","4,4":"red","6,5":"red","5,4":"red","5,5":"red","1,3":"green","2,6":"red","2,3":"red","2,5":"red","2,4":"red","5,7":"green","6,3":"green","5,8":"green","5,6":"red","5,3":"red"},
        folds: 2},

        {start: {"5,6":"amber","4,6":"amber","4,5":"purple","3,9":"purple","3,7":"purple","4,8":"purple","4,9":"purple","4,7":"purple"},
        target: {"5,6":"amber","4,6":"amber","4,5":"purple","3,9":"purple","3,7":"purple","4,8":"purple","4,9":"purple","4,7":"purple","3,1":"amber","3,2":"amber","3,3":"purple","1,2":"purple","2,3":"purple","2,1":"purple","1,1":"purple","2,2":"purple","2,6":"amber","3,6":"amber","3,5":"purple","3,8":"purple","4,1":"amber","4,2":"amber","4,3":"purple","6,2":"purple","5,3":"purple","5,1":"purple","6,1":"purple","5,2":"purple"},
        folds: 2},

        {start: {"3,6":"dkblue","4,4":"dkblue","4,7":"dkblue","4,5":"dkblue","3,5":"dkblue","3,7":"dkblue"},
        target: {"3,6":"dkblue","4,4":"dkblue","4,7":"dkblue","4,5":"dkblue","3,5":"dkblue","3,7":"dkblue","6,6":"dkblue","5,4":"dkblue","5,7":"dkblue","5,5":"dkblue","6,5":"dkblue","6,7":"dkblue","4,10":"dkblue","6,9":"dkblue","4,8":"dkblue","5,9":"dkblue","5,10":"dkblue","4,9":"dkblue","6,8":"dkblue","5,6":"dkblue"},
        folds: 2},

        {start: {"0,8":"red","1,4":"red","0,4":"purple","0,3":"purple","1,6":"purple","0,7":"purple","0,5":"purple","0,6":"purple"},
        target: {"0,8":"red","1,4":"red","0,4":"purple","0,3":"purple","1,6":"purple","0,7":"purple","0,5":"purple","0,6":"purple","3,0":"red","1,3":"red","1,2":"purple","0,2":"purple","2,2":"purple","2,0":"purple","1,1":"purple","2,1":"purple","3,8":"red","2,4":"red","3,4":"purple","3,3":"purple","2,6":"purple","3,7":"purple","3,5":"purple","3,6":"purple","0,0":"red","2,3":"red","3,2":"purple","1,0":"purple"},
        folds: 2},

        {start: {"2,4":"dkblue","3,4":"dkblue","4,3":"green","3,3":"green","2,6":"green","3,6":"green","1,5":"red","2,5":"red"},
        target: {"2,4":"dkblue","3,4":"dkblue","4,3":"green","3,3":"green","2,6":"green","3,6":"green","1,5":"red","2,5":"red","4,9":"dkblue","4,8":"dkblue","5,7":"green","5,8":"green","3,8":"green","3,7":"green","3,10":"red","3,9":"red","1,3":"green","2,3":"green","4,5":"red","3,5":"red","1,9":"dkblue","1,8":"dkblue","0,7":"green","0,8":"green","2,8":"green","2,7":"green","2,10":"red","2,9":"red"},
        folds: 2},

        {start: {"1,8":"dkblue","0,8":"dkblue","1,4":"purple","1,6":"purple","0,4":"purple","0,7":"purple","0,6":"purple","0,5":"purple"},
        target: {"1,8":"dkblue","0,8":"dkblue","1,4":"purple","1,6":"purple","0,4":"purple","0,7":"purple","0,6":"purple","0,5":"purple","4,8":"dkblue","5,8":"dkblue","4,4":"purple","4,6":"purple","5,4":"purple","5,7":"purple","5,6":"purple","5,5":"purple","6,8":"dkblue","7,8":"dkblue","6,4":"purple","6,6":"purple","7,4":"purple","7,7":"purple","7,6":"purple","7,5":"purple","3,8":"dkblue","2,8":"dkblue","3,4":"purple","3,6":"purple","2,4":"purple","2,7":"purple","2,6":"purple","2,5":"purple"},
        folds: 2},

        {start: {"4,7":"amber","2,10":"amber","1,9":"purple","3,7":"purple","2,9":"purple","3,6":"purple","2,8":"purple","3,8":"purple"},
        target: {"4,7":"amber","2,10":"amber","1,9":"purple","3,7":"purple","2,9":"purple","3,6":"purple","2,8":"purple","3,8":"purple","4,6":"amber","5,2":"amber","4,1":"purple","4,5":"purple","4,2":"purple","3,5":"purple","4,3":"purple","4,4":"purple","1,7":"amber","3,10":"amber","4,9":"purple","2,7":"purple","3,9":"purple","2,6":"purple","1,6":"amber","0,2":"amber","1,1":"purple","1,5":"purple","1,2":"purple","2,5":"purple","1,3":"purple","1,4":"purple"},
        folds: 2},

        {start: {"6,5":"dkblue","7,2":"dkblue","6,3":"green","6,2":"green","6,4":"green","7,4":"green"},
        target: {"6,5":"dkblue","7,2":"dkblue","6,3":"green","6,2":"green","6,4":"green","7,4":"green","3,5":"dkblue","2,2":"dkblue","3,3":"green","3,2":"green","3,4":"green","2,4":"green","1,5":"dkblue","0,2":"dkblue","1,3":"green","1,2":"green","1,4":"green","0,4":"green","4,5":"dkblue","5,2":"dkblue","4,3":"green","4,2":"green","4,4":"green","5,4":"green"},
        folds: 2},

        {start: {"4,10":"dkblue","3,7":"green","4,9":"green","4,6":"green","4,8":"green","4,7":"red"},
        target: {"4,10":"dkblue","3,7":"green","4,9":"green","4,6":"green","4,8":"green","4,7":"red","7,2":"dkblue","5,2":"green","6,2":"green","5,4":"green","6,3":"green","5,3":"red","5,10":"dkblue","6,7":"green","5,9":"green","5,6":"green","5,8":"green","5,7":"red","2,2":"dkblue","4,2":"green","3,2":"green","4,4":"green","3,3":"green","4,3":"red"},
        folds: 2},

        {start: {"4,7":"dkblue","4,6":"dkblue","5,6":"dkblue","5,3":"dkblue","5,4":"dkblue","5,5":"dkblue"},
        target: {"4,7":"dkblue","4,6":"dkblue","5,6":"dkblue","5,3":"dkblue","5,4":"dkblue","5,5":"dkblue","2,2":"dkblue","3,2":"dkblue","3,1":"dkblue","5,2":"dkblue","4,2":"dkblue","4,1":"dkblue","6,0":"dkblue","6,1":"dkblue","6,2":"dkblue","6,3":"dkblue","3,0":"dkblue","4,4":"dkblue","4,3":"dkblue","3,3":"dkblue"},
        folds: 2},

        {start: {"5,5":"dkblue","6,9":"dkblue","5,6":"dkblue","6,7":"green","7,8":"red","6,8":"red","5,7":"red"},
        target: {"5,5":"dkblue","6,9":"dkblue","5,6":"dkblue","6,7":"green","7,8":"red","6,8":"red","5,7":"red","4,5":"dkblue","3,9":"dkblue","4,6":"dkblue","3,7":"green","2,8":"red","3,8":"red","4,7":"red","7,5":"dkblue","6,6":"green","7,7":"red","7,6":"red","6,5":"red","4,4":"dkblue","6,1":"dkblue","5,4":"dkblue","5,2":"green","5,0":"red","5,1":"red","5,3":"red"},
        folds: 2},

        {start: {"5,1":"dkblue","4,-2":"dkblue","6,2":"purple","5,0":"purple","6,1":"purple","4,0":"purple","5,-2":"purple","4,-1":"purple"},
        target: {"5,1":"dkblue","4,-2":"dkblue","6,2":"purple","5,0":"purple","6,1":"purple","4,0":"purple","5,-2":"purple","4,-1":"purple","6,3":"dkblue","7,6":"dkblue","6,4":"purple","6,5":"purple","7,5":"purple","6,6":"purple","3,8":"dkblue","1,8":"dkblue","4,9":"purple","2,8":"purple","3,9":"purple","2,7":"purple","1,9":"purple","1,7":"purple","4,8":"dkblue","6,8":"dkblue","5,8":"purple","5,7":"purple","6,9":"purple","6,7":"purple"},
        folds: 2},

        {start: {"4,3":"dkblue","5,0":"dkblue","3,3":"dkblue","4,0":"red","4,2":"red","4,1":"red"},
        target: {"4,3":"dkblue","5,0":"dkblue","3,3":"dkblue","4,0":"red","4,2":"red","4,1":"red","4,4":"dkblue","6,4":"dkblue","4,5":"dkblue","6,5":"red","5,4":"red","5,5":"red","5,7":"dkblue","7,7":"dkblue","5,8":"dkblue","7,8":"red","6,7":"red","6,8":"red","5,6":"dkblue","6,3":"dkblue","4,6":"dkblue","5,3":"red"},
        folds: 2},

        {start: {"4,8":"amber","3,5":"amber","5,6":"purple","4,4":"purple","4,7":"purple","4,5":"purple","4,6":"purple","5,8":"purple"},
        target: {"4,8":"amber","3,5":"amber","5,6":"purple","4,4":"purple","4,7":"purple","4,5":"purple","4,6":"purple","5,8":"purple","7,0":"amber","5,0":"amber","6,2":"purple","5,2":"purple","6,0":"purple","5,1":"purple","6,1":"purple","7,1":"purple","6,3":"amber","4,3":"amber","5,5":"purple","5,3":"purple","5,4":"purple","6,4":"purple","3,11":"amber","2,8":"amber","4,9":"purple","3,7":"purple","3,10":"purple","3,8":"purple","3,9":"purple","4,11":"purple"},
        folds: 2},

        {start: {"4,6":"dkblue","4,5":"dkblue","4,4":"green","4,2":"green","3,3":"green","4,3":"green"},
        target: {"4,6":"dkblue","4,5":"dkblue","4,4":"green","4,2":"green","3,3":"green","4,3":"green","4,7":"dkblue","3,7":"dkblue","3,8":"green","2,9":"green","2,7":"green","2,8":"green","5,6":"green","6,7":"green","5,8":"green","5,7":"green","3,5":"dkblue","3,6":"dkblue","2,6":"green","1,7":"green"},
        folds: 2},

        {start: {"0,3":"amber","0,2":"amber","1,4":"amber","0,5":"purple","0,4":"purple"},
        target: {"0,3":"amber","0,2":"amber","1,4":"amber","0,5":"purple","0,4":"purple","1,7":"amber","2,7":"amber","1,5":"amber","0,6":"purple","1,6":"purple","3,3":"amber","3,2":"amber","2,4":"amber","3,5":"purple","3,4":"purple","2,5":"amber","3,6":"purple","2,6":"purple","7,3":"amber","7,2":"amber","6,4":"amber","7,5":"purple","7,4":"purple","6,7":"amber","5,7":"amber","6,5":"amber","7,6":"purple","6,6":"purple","4,3":"amber","4,2":"amber","5,4":"amber","4,5":"purple","4,4":"purple","5,5":"amber","4,6":"purple","5,6":"purple"},
        folds: 3},

        {start: {"4,5":"dkblue","3,5":"red"}, //medium
        target: {"4,5":"dkblue","3,5":"red","3,7":"dkblue","3,6":"red","2,10":"dkblue","2,9":"red","3,8":"dkblue","2,8":"red","3,3":"dkblue","3,4":"red","2,3":"dkblue","2,4":"red","0,3":"dkblue","0,4":"red","1,3":"dkblue","1,4":"red"},
        folds: 3 },

        {start: {"3,8":"red","5,5":"red","5,6":"red","2,8":"red","3,7":"red","4,6":"purple","4,7":"purple"},
        target: {"3,8":"red","5,5":"red","5,6":"red","2,8":"red","3,7":"red","4,6":"purple","4,7":"purple","4,4":"red","4,9":"red","4,8":"red","4,3":"red","4,5":"red","5,1":"red","5,0":"red","5,2":"red","5,4":"purple","5,3":"purple","6,2":"red","6,3":"red","3,5":"red"},
        folds: 2},

        {start: {"4,7":"amber","4,8":"amber","5,10":"purple","4,11":"purple","3,11":"purple","3,9":"purple","4,9":"purple","4,10":"purple"},
        target: {"4,7":"amber","4,8":"amber","5,10":"purple","4,11":"purple","3,11":"purple","3,9":"purple","4,9":"purple","4,10":"purple","3,5":"amber","3,4":"amber","2,2":"purple","1,3":"purple","1,4":"purple","2,5":"purple","2,4":"purple","2,3":"purple","3,7":"amber","3,8":"amber","2,10":"purple","3,10":"purple","4,5":"amber","4,4":"amber","5,2":"purple","6,3":"purple","6,4":"purple","5,5":"purple","5,4":"purple","5,3":"purple"},
        folds: 2},

        {start: {"5,10":"dkblue","4,10":"dkblue","7,7":"red","5,9":"red","6,9":"red","7,8":"red","6,8":"red"},
        target: {"5,10":"dkblue","4,10":"dkblue","7,7":"red","5,9":"red","6,9":"red","7,8":"red","6,8":"red","3,5":"dkblue","3,6":"dkblue","6,3":"red","4,5":"red","4,4":"red","5,3":"red","5,4":"red","7,3":"dkblue","7,2":"dkblue","7,4":"red","7,5":"red","7,6":"red","4,3":"dkblue","4,2":"dkblue","4,8":"red","4,7":"red","4,6":"red"},
        folds: 2},

        {start: {"1,5":"dkblue","2,9":"dkblue","1,8":"dkblue","1,6":"dkblue","1,9":"dkblue","1,7":"dkblue"},
        target: {"1,5":"dkblue","2,9":"dkblue","1,8":"dkblue","1,6":"dkblue","1,9":"dkblue","1,7":"dkblue","2,3":"dkblue","4,2":"dkblue","3,1":"dkblue","2,2":"dkblue","4,1":"dkblue","3,2":"dkblue","6,5":"dkblue","5,9":"dkblue","6,8":"dkblue","6,6":"dkblue","6,9":"dkblue","6,7":"dkblue","5,3":"dkblue","5,2":"dkblue"},
        folds: 2},

        {start: {"2,6":"dkblue","2,5":"red"}, //medium
        target: {"2,6":"dkblue","2,5":"red","3,4":"dkblue","2,4":"red","1,6":"dkblue","1,5":"red","0,4":"dkblue","1,4":"red","5,6":"dkblue","5,5":"red","4,4":"dkblue","5,4":"red","6,6":"dkblue","6,5":"red","7,4":"dkblue","6,4":"red"},
        folds: 3},

        {start: {"0,2":"green","0,3":"green","1,4":"green","0,4":"red","0,1":"red","0,0":"red","1,0":"red"},
        target: {"0,2":"green","0,3":"green","1,4":"green","0,4":"red","0,1":"red","0,0":"red","1,0":"red","3,2":"green","3,3":"green","2,4":"green","3,4":"red","3,1":"red","3,0":"red","2,0":"red","3,10":"green","2,10":"green","2,8":"green","2,9":"red","3,11":"red","4,11":"red","4,10":"red","4,6":"green","4,5":"green","3,6":"green","3,5":"red","5,6":"red","5,7":"red","5,8":"red"},
        folds: 2},

        { start: {"4,6":"dkblue","4,7":"red"}, //medium
        target: {"4,6":"dkblue","4,7":"red","3,10":"dkblue","3,9":"red","4,5":"dkblue","3,5":"red","1,5":"dkblue","2,5":"red","3,2":"dkblue","2,2":"red","0,2":"dkblue","1,2":"red","3,3":"dkblue","3,4":"red","2,7":"dkblue","2,6":"red"},
        folds: 3 },

        {start: {"3,2":"red","2,2":"red","1,3":"red","2,4":"red","2,3":"red","2,5":"purple","1,5":"purple"},
        target: {"3,2":"red","2,2":"red","1,3":"red","2,4":"red","2,3":"red","2,5":"purple","1,5":"purple","4,2":"red","5,2":"red","6,3":"red","5,4":"red","5,3":"red","5,5":"purple","6,5":"purple","4,6":"red","4,7":"red","3,8":"red","3,6":"red","3,7":"red","2,6":"purple","2,7":"purple","5,1":"red","4,1":"purple","4,0":"purple"},
        folds: 2},

        {start: {"1,5":"amber","2,4":"amber","3,4":"amber","2,0":"amber","2,5":"amber","2,3":"amber","2,1":"purple","2,2":"purple"},
        target: {"1,5":"amber","2,4":"amber","3,4":"amber","2,0":"amber","2,5":"amber","2,3":"amber","2,1":"purple","2,2":"purple","2,7":"amber","3,6":"amber","3,5":"amber","5,8":"amber","2,6":"amber","3,7":"amber","4,8":"purple","4,7":"purple","0,7":"amber","0,6":"purple","1,6":"purple","3,3":"amber","5,7":"amber","4,5":"amber","5,6":"purple","4,6":"purple"},
        folds: 2},

        {start: {"0,7":"dkblue","0,6":"dkblue","0,5":"green","1,6":"red"}, //medium
        target: {"0,7":"dkblue","0,6":"dkblue","0,5":"green","1,6":"red","1,3":"dkblue","1,4":"dkblue","0,4":"green","1,5":"red","2,0":"dkblue","2,1":"dkblue","1,1":"green","2,2":"red","1,2":"green","2,3":"red","0,8":"dkblue","1,8":"dkblue","1,9":"green","1,7":"red","3,8":"dkblue","2,8":"dkblue","2,9":"green","2,7":"red","5,8":"dkblue","4,8":"dkblue","4,9":"green","4,7":"red","3,9":"green","3,7":"red"},
        folds: 3},
        
        {start: {"2,0":"dkblue","3,0":"dkblue","2,1":"green","1,1":"green"}, //medium
        target: {"2,0":"dkblue","3,0":"dkblue","2,1":"green","1,1":"green","1,4":"dkblue","1,5":"dkblue","1,3":"green","1,2":"green","4,5":"dkblue","4,4":"dkblue","3,5":"green","3,6":"green","2,5":"green","2,6":"green","5,8":"dkblue","5,7":"dkblue","4,8":"green","4,9":"green","2,8":"dkblue","2,7":"dkblue","3,8":"green","3,9":"green","3,3":"dkblue","4,3":"dkblue","3,4":"green","2,4":"green"},
        folds: 3},
        
        {start: {"4,6":"dkblue","4,7":"red"}, //medium
        target: {"4,6":"dkblue","4,7":"red","3,10":"dkblue","3,9":"red","4,5":"dkblue","3,5":"red","1,5":"dkblue","2,5":"red","3,2":"dkblue","2,2":"red","0,2":"dkblue","1,2":"red","3,3":"dkblue","3,4":"red","2,7":"dkblue","2,6":"red"},
        folds: 3 },

        ],

hard: [

        {start: {"2,8":"amber","3,6":"amber","2,6":"amber","3,5":"purple","2,7":"purple"},
        target: {"2,8":"amber","3,6":"amber","2,6":"amber","3,5":"purple","2,7":"purple","5,8":"amber","4,6":"amber","5,6":"amber","4,5":"purple","5,7":"purple","7,8":"amber","6,6":"amber","7,6":"amber","6,5":"purple","7,7":"purple","4,8":"amber","5,5":"purple","4,7":"purple","0,8":"amber","1,6":"amber","0,6":"amber","1,5":"purple","0,7":"purple","3,8":"amber","2,5":"purple","3,7":"purple"},
        folds: 3},

        {start: {"4,10":"dkblue","5,10":"dkblue","4,7":"red","4,8":"red","4,9":"red","3,11":"red","4,11":"red"},
        target: {"4,10":"dkblue","5,10":"dkblue","4,7":"red","4,8":"red","4,9":"red","3,11":"red","4,11":"red","3,10":"dkblue","2,10":"dkblue","3,7":"red","3,8":"red","3,9":"red","3,6":"dkblue","3,5":"dkblue","2,7":"red","2,6":"red","2,8":"dkblue","2,9":"dkblue","6,5":"dkblue","6,6":"dkblue","4,6":"red","5,6":"red","5,5":"red","6,3":"red","6,4":"red","5,3":"dkblue","5,2":"dkblue","4,5":"red","4,4":"red","5,4":"red","3,3":"red","3,4":"red","4,3":"dkblue","4,2":"dkblue"},
        folds: 3},

        {start: {"1,2":"red","1,3":"red","1,4":"amber","1,5":"amber"},
        target: {"1,2":"red","1,3":"red","1,4":"amber","1,5":"amber","0,2":"amber","0,1":"amber","4,2":"red","4,3":"red","4,4":"amber","4,5":"amber","5,2":"amber","5,1":"amber","6,2":"red","6,3":"red","6,4":"amber","6,5":"amber","7,2":"amber","7,1":"amber","3,2":"red","3,3":"red","3,4":"amber","3,5":"amber","2,2":"amber","2,1":"amber"},
        folds: 3},

        {start: {"2,0":"dkblue","2,1":"dkblue","3,4":"purple","3,3":"purple","3,2":"purple","2,2":"purple"},
        target: {"2,0":"dkblue","2,1":"dkblue","3,4":"purple","3,3":"purple","3,2":"purple","2,2":"purple","4,0":"purple","4,1":"purple","3,1":"purple","3,0":"purple","5,8":"dkblue","4,8":"dkblue","3,5":"purple","4,5":"purple","4,6":"purple","4,7":"purple","6,5":"purple","5,5":"purple","5,6":"purple","5,7":"purple","1,4":"dkblue","1,3":"dkblue","2,4":"purple","2,3":"purple","2,7":"purple","2,6":"purple","2,5":"purple","1,5":"purple","6,4":"dkblue","6,3":"dkblue","4,3":"purple","4,4":"purple","5,4":"purple","5,3":"purple"},
        folds: 3},

        {start: {"5,1":"red","4,3":"red","6,1":"red","5,2":"red","4,2":"red"},
        target: {"5,1":"red","4,3":"red","6,1":"red","5,2":"red","4,2":"red","7,6":"red","5,7":"red","7,5":"red","6,6":"red","6,7":"red","4,1":"red","5,3":"red","3,1":"red","2,6":"red","4,7":"red","2,5":"red","3,6":"red","3,7":"red","2,1":"red","3,3":"red","1,1":"red","2,2":"red","3,2":"red","0,6":"red","2,7":"red","0,5":"red","1,6":"red","1,7":"red","2,3":"red","5,6":"red","5,5":"red","4,6":"red"},
        folds: 3},

        {start: {"0,2":"dkblue","0,1":"red"}, //hard
        target: {"0,2":"dkblue","0,1":"red","2,7":"dkblue","2,8":"red","3,2":"dkblue","3,1":"red","1,7":"dkblue","1,8":"red","3,10":"dkblue","3,11":"red","1,5":"dkblue","1,4":"red","4,6":"dkblue","5,6":"red","1,6":"dkblue","0,6":"red"},
        folds: 3  },

        {start: {"1,3":"dkblue","1,2":"dkblue","0,2":"amber","0,1":"amber","0,0":"amber"},
        target: {"1,3":"dkblue","1,2":"dkblue","0,2":"amber","0,1":"amber","0,0":"amber","1,4":"amber","1,5":"amber","2,5":"amber","2,3":"dkblue","2,2":"dkblue","3,2":"amber","3,1":"amber","3,0":"amber","2,4":"amber","3,8":"dkblue","3,9":"dkblue","3,10":"amber","3,11":"amber","4,11":"amber","2,8":"amber","2,7":"amber","2,6":"amber","3,7":"dkblue","4,7":"dkblue","4,6":"amber","5,6":"amber","5,7":"amber","3,6":"amber"},
        folds: 3},

        {start: {"5,8":"dkblue","4,6":"dkblue","4,8":"dkblue","4,7":"green"}, //hard
        target: {"5,8":"dkblue","4,6":"dkblue","4,8":"dkblue","4,7":"green","2,0":"dkblue","3,2":"dkblue","2,1":"dkblue","2,2":"green","5,6":"dkblue","5,7":"green","7,0":"dkblue","6,2":"dkblue","7,1":"dkblue","7,2":"green","2,8":"dkblue","3,6":"dkblue","3,8":"dkblue","3,7":"green","5,0":"dkblue","4,2":"dkblue","5,1":"dkblue","5,2":"green","2,6":"dkblue","2,7":"green","0,0":"dkblue","1,2":"dkblue","0,1":"dkblue","0,2":"green"},
        folds: 3},

        {start: {"7,8":"dkblue","7,7":"dkblue","6,6":"red","7,6":"red","6,4":"red","7,4":"red","6,5":"red"},
        target: {"7,8":"dkblue","7,7":"dkblue","6,6":"red","7,6":"red","6,4":"red","7,4":"red","6,5":"red","2,8":"dkblue","2,7":"dkblue","3,6":"red","2,6":"red","3,4":"red","2,4":"red","3,5":"red","4,0":"dkblue","5,0":"dkblue","5,2":"red","5,1":"red","6,3":"red","6,2":"red","5,3":"red","3,7":"red","3,8":"red","4,8":"red","4,9":"red","4,7":"red","0,8":"dkblue","0,7":"dkblue","1,6":"red","0,6":"red","1,4":"red","0,4":"red","1,5":"red","5,8":"dkblue","5,7":"dkblue","4,6":"red","5,6":"red","4,4":"red","5,4":"red","4,5":"red","3,0":"dkblue","2,0":"dkblue","2,2":"red","2,1":"red","1,3":"red","1,2":"red","2,3":"red","3,9":"red"},
        folds: 3},
        
        {start: {"3,5":"dkblue","4,7":"dkblue","4,5":"dkblue","4,6":"green"}, //hard
        target: {"3,5":"dkblue","4,7":"dkblue","4,5":"dkblue","4,6":"green","3,4":"dkblue","2,2":"dkblue","3,3":"dkblue","3,2":"green","6,5":"dkblue","5,7":"dkblue","5,5":"dkblue","5,6":"green","6,4":"dkblue","7,2":"dkblue","6,3":"dkblue","6,2":"green","3,7":"dkblue","3,6":"green","4,4":"dkblue","5,2":"dkblue","4,3":"dkblue","4,2":"green","1,5":"dkblue","2,7":"dkblue","2,5":"dkblue","2,6":"green","1,4":"dkblue","0,2":"dkblue","1,3":"dkblue","1,2":"green"},
        folds: 3 },
        
        {start: {"2,9":"amber","1,9":"amber","1,8":"amber","0,8":"purple","0,7":"purple"},
        target: {"2,9":"amber","1,9":"amber","1,8":"amber","0,8":"purple","0,7":"purple","3,5":"amber","3,4":"amber","2,4":"amber","2,3":"purple","1,3":"purple","0,4":"amber","0,5":"amber","0,6":"amber","3,6":"amber","3,7":"purple","3,8":"purple","5,9":"amber","6,9":"amber","6,8":"amber","7,8":"purple","7,7":"purple","4,5":"amber","4,4":"amber","5,4":"amber","5,3":"purple","6,3":"purple","7,4":"amber","7,5":"amber","7,6":"amber","4,6":"amber","4,7":"purple","4,8":"purple"},
        folds: 3},

        {start: {"2,1":"purple","1,2":"purple","0,2":"purple","1,1":"purple"},
        target: {"2,1":"purple","1,2":"purple","0,2":"purple","1,1":"purple","3,1":"purple","4,2":"purple","5,2":"purple","4,1":"purple","5,1":"purple","6,2":"purple","7,2":"purple","6,1":"purple","3,2":"purple","2,2":"purple","4,8":"purple","3,9":"purple","3,10":"purple","4,9":"purple","5,6":"purple","5,4":"purple","5,3":"purple","5,5":"purple","6,3":"purple","6,0":"purple","4,6":"purple","4,7":"purple"},
        folds: 3},

        {start: {"2,2":"dkblue","2,3":"dkblue","1,5":"purple","2,5":"purple","3,2":"purple","2,4":"purple"},
        target: {"2,2":"dkblue","2,3":"dkblue","1,5":"purple","2,5":"purple","3,2":"purple","2,4":"purple","2,1":"dkblue","1,1":"dkblue","0,1":"purple","0,0":"purple","2,0":"purple","1,0":"purple","5,2":"dkblue","5,3":"dkblue","6,5":"purple","5,5":"purple","4,2":"purple","5,4":"purple","5,1":"dkblue","6,1":"dkblue","7,1":"purple","7,0":"purple","5,0":"purple","6,0":"purple","4,7":"dkblue","3,7":"dkblue","2,7":"purple","2,6":"purple","4,6":"purple","3,6":"purple","4,8":"dkblue","4,9":"dkblue","3,11":"purple","4,11":"purple","5,8":"purple","4,10":"purple","4,0":"purple","4,1":"purple","6,3":"dkblue","6,2":"dkblue","6,4":"purple","7,2":"purple"},
        folds: 3},

        {start: {"2,2":"dkblue","3,2":"dkblue","3,3":"amber","4,3":"amber"},
        target: {"2,2":"dkblue","3,2":"dkblue","3,3":"amber","4,3":"amber","5,10":"dkblue","5,9":"dkblue","5,8":"amber","5,7":"amber","2,3":"dkblue","2,4":"dkblue","3,4":"amber","3,5":"amber","7,3":"dkblue","7,4":"dkblue","6,4":"amber","6,5":"amber","5,2":"dkblue","4,2":"dkblue","2,10":"dkblue","2,9":"dkblue","2,8":"amber","2,7":"amber","5,3":"dkblue","5,4":"dkblue","4,4":"amber","4,5":"amber","0,3":"dkblue","0,4":"dkblue","1,4":"amber","1,5":"amber"},
        folds: 3},

        {start: {"4,1":"dkblue","4,2":"dkblue"}, //hard
        target: {"4,1":"dkblue","4,2":"dkblue","3,1":"dkblue","3,2":"dkblue","1,9":"dkblue","2,9":"dkblue","1,8":"dkblue","1,7":"dkblue","5,5":"dkblue","5,4":"dkblue","5,6":"dkblue","4,6":"dkblue","0,5":"dkblue","0,4":"dkblue","0,6":"dkblue","1,6":"dkblue"},
        folds: 3},

        {start: {"7,0":"green","6,0":"green","6,1":"purple","6,2":"purple"},
        target: {"7,0":"green","6,0":"green","6,1":"purple","6,2":"purple","2,0":"green","3,0":"green","3,1":"purple","3,2":"purple","7,1":"green","7,2":"green","5,8":"green","5,7":"green","5,6":"purple","4,6":"purple","0,0":"green","1,0":"green","1,1":"purple","1,2":"purple","5,0":"green","4,0":"green","4,1":"purple","4,2":"purple","0,1":"green","0,2":"green","2,8":"green","2,7":"green","2,6":"purple","3,6":"purple"},
        folds: 3},

        {start: {"6,1":"red","7,2":"red","6,2":"red","6,3":"red","5,3":"red"},
        target: {"6,1":"red","7,2":"red","6,2":"red","6,3":"red","5,3":"red","3,1":"red","2,2":"red","3,2":"red","3,3":"red","4,3":"red","7,5":"red","7,3":"red","7,4":"red","6,4":"red","6,5":"red","6,9":"red","5,10":"red","5,9":"red","5,8":"red","5,7":"red","1,1":"red","0,2":"red","1,2":"red","1,3":"red","2,3":"red","4,1":"red","5,2":"red","4,2":"red","0,5":"red","0,3":"red","0,4":"red","1,4":"red","1,5":"red","1,9":"red","2,10":"red","2,9":"red","2,8":"red","2,7":"red"},
        folds: 3},

        {start: {"4,5":"dkblue","4,7":"dkblue","5,6":"amber","4,6":"amber"},
        target: {"4,5":"dkblue","4,7":"dkblue","5,6":"amber","4,6":"amber","5,1":"dkblue","6,0":"dkblue","6,2":"amber","6,1":"amber","4,4":"dkblue","5,3":"dkblue","5,5":"amber","5,4":"amber","3,8":"dkblue","3,10":"dkblue","4,9":"amber","3,9":"amber","3,5":"dkblue","3,7":"dkblue","2,6":"amber","3,6":"amber","2,1":"dkblue","1,0":"dkblue","1,2":"amber","1,1":"amber","3,4":"dkblue","2,3":"dkblue","2,5":"amber","2,4":"amber","4,8":"dkblue","4,10":"dkblue"},
        folds: 3},

        {start: {"1,5":"dkblue","2,5":"green","2,6":"green"}, //hard
        target: {"1,5":"dkblue","2,5":"green","2,6":"green","6,5":"dkblue","5,5":"green","5,6":"green","2,3":"dkblue","2,4":"green","3,4":"green","4,10":"dkblue","4,9":"green","4,8":"green","3,0":"dkblue","3,1":"green","4,1":"green","5,7":"dkblue","2,2":"dkblue","3,2":"green","3,3":"green","7,2":"dkblue","6,2":"green","6,3":"green"},
        folds: 3},

        {start: {"1,2":"red","1,1":"red","0,3":"amber","0,2":"amber"},
        target: {"1,2":"red","1,1":"red","0,3":"amber","0,2":"amber","2,6":"red","3,6":"red","1,7":"amber","2,7":"amber","3,9":"red","4,9":"red","2,10":"amber","3,10":"amber","2,5":"red","2,4":"red","1,6":"amber","1,5":"amber","4,2":"red","4,1":"red","5,3":"amber","5,2":"amber","4,7":"amber","3,7":"amber","2,9":"red","1,9":"red","3,5":"red","3,4":"red","4,6":"amber","4,5":"amber"},
        folds: 3},

        {start: {"5,8":"dkblue","4,6":"dkblue","4,8":"dkblue","4,7":"green"}, //hard
        target: {"5,8":"dkblue","4,6":"dkblue","4,8":"dkblue","4,7":"green","2,0":"dkblue","3,2":"dkblue","2,1":"dkblue","2,2":"green","5,6":"dkblue","5,7":"green","7,0":"dkblue","6,2":"dkblue","7,1":"dkblue","7,2":"green","2,8":"dkblue","3,6":"dkblue","3,8":"dkblue","3,7":"green","5,0":"dkblue","4,2":"dkblue","5,1":"dkblue","5,2":"green","2,6":"dkblue","2,7":"green","0,0":"dkblue","1,2":"dkblue","0,1":"dkblue","0,2":"green"},
        folds: 3 },

        {start: {"5,5":"dkblue","5,6":"dkblue","5,9":"red","6,7":"red","5,7":"red","6,8":"red","6,9":"red"},
        target: {"5,5":"dkblue","5,6":"dkblue","5,9":"red","6,7":"red","5,7":"red","6,8":"red","6,9":"red","6,5":"dkblue","6,6":"dkblue","5,8":"red","2,5":"dkblue","2,6":"dkblue","2,9":"red","1,7":"red","2,7":"red","1,8":"red","1,9":"red","1,5":"dkblue","1,6":"dkblue","2,8":"red","4,9":"dkblue","4,8":"dkblue","4,10":"dkblue","5,10":"dkblue","2,4":"dkblue","3,4":"dkblue","4,2":"red","3,2":"red","3,3":"red","3,1":"red","4,1":"red","2,3":"dkblue","2,2":"dkblue","4,3":"red"},
        folds: 3},

        {start: {"2,5":"red","3,7":"purple","3,6":"purple","2,6":"purple","4,8":"purple","4,7":"purple"},
        target: {"2,5":"red","3,7":"purple","3,6":"purple","2,6":"purple","4,8":"purple","4,7":"purple","2,4":"red","4,5":"purple","3,5":"purple","3,4":"purple","5,6":"purple","4,6":"purple","3,9":"red","3,8":"purple","4,9":"red","4,4":"purple","7,5":"red","6,7":"purple","6,6":"purple","7,6":"purple","5,8":"purple","5,7":"purple","7,4":"red","5,5":"purple","6,5":"purple","6,4":"purple","6,9":"red","6,8":"purple","5,9":"red","5,4":"purple"},
        folds: 3},
        
        {start: {"3,5":"dkblue","4,7":"dkblue","4,5":"dkblue","4,6":"green"}, //hard
        target: {"3,5":"dkblue","4,7":"dkblue","4,5":"dkblue","4,6":"green","3,4":"dkblue","2,2":"dkblue","3,3":"dkblue","3,2":"green","6,5":"dkblue","5,7":"dkblue","5,5":"dkblue","5,6":"green","6,4":"dkblue","7,2":"dkblue","6,3":"dkblue","6,2":"green","3,7":"dkblue","3,6":"green","4,4":"dkblue","5,2":"dkblue","4,3":"dkblue","4,2":"green","1,5":"dkblue","2,7":"dkblue","2,5":"dkblue","2,6":"green","1,4":"dkblue","0,2":"dkblue","1,3":"dkblue","1,2":"green"},
        folds: 3 },
        
        {start: {"5,2":"dkblue","6,0":"dkblue","6,1":"green","5,1":"green"}, //hard
        target: {"5,2":"dkblue","6,0":"dkblue","6,1":"green","5,1":"green","4,2":"dkblue","3,0":"dkblue","3,1":"green","4,1":"green","2,2":"dkblue","1,0":"dkblue","1,1":"green","2,1":"green","3,2":"dkblue","4,0":"dkblue","5,3":"dkblue","7,2":"dkblue","6,2":"green","6,3":"green","5,4":"dkblue","5,7":"dkblue","5,6":"green","5,5":"green","4,7":"dkblue","4,10":"dkblue","4,9":"green","4,8":"green","4,6":"dkblue","6,5":"dkblue"},
        folds: 3},

        {start: {"2,6":"dkblue","2,7":"green"}, //hard
        target: {"2,6":"dkblue","2,7":"green","1,2":"dkblue","0,2":"green","4,1":"dkblue","4,0":"green","1,1":"dkblue","1,0":"green","2,5":"dkblue","1,5":"green","3,9":"dkblue","3,10":"green","5,5":"dkblue","6,5":"green","4,9":"dkblue","4,10":"green"},
        folds: 3 },
        
        {start: {"5,6":"dkblue","5,7":"green"}, //hard
        target: {"5,6":"dkblue","5,7":"green","2,6":"dkblue","2,7":"green","4,6":"dkblue","4,7":"green","7,6":"dkblue","7,7":"green","3,6":"dkblue","3,7":"green","0,6":"dkblue","0,7":"green"},
        folds: 3},

        {start: {"2,8":"dkblue","2,10":"dkblue","1,9":"amber","2,9":"amber"},
        target: {"2,8":"dkblue","2,10":"dkblue","1,9":"amber","2,9":"amber","3,8":"dkblue","3,10":"dkblue","4,9":"amber","3,9":"amber","4,3":"dkblue","5,2":"dkblue","4,1":"amber","4,2":"amber","4,4":"dkblue","5,3":"dkblue","5,5":"amber","5,4":"amber","5,8":"dkblue","5,10":"dkblue","6,9":"amber","5,9":"amber","4,8":"dkblue","4,10":"dkblue","3,3":"dkblue","2,2":"dkblue","3,1":"amber","3,2":"amber","3,4":"dkblue","2,3":"dkblue","2,5":"amber","2,4":"amber"},
        folds: 3},

        {start: {"5,6":"dkblue","5,5":"dkblue"}, //hard
        target: {"5,6":"dkblue","5,5":"dkblue","3,1":"dkblue","4,1":"dkblue","4,4":"dkblue","5,4":"dkblue","6,9":"dkblue","6,8":"dkblue","4,8":"dkblue","4,9":"dkblue","1,8":"dkblue","1,9":"dkblue","3,8":"dkblue","3,9":"dkblue"},
        folds: 3},
        
        {start: {"2,7":"dkblue","2,6":"dkblue"}, //hard
        target: {"2,7":"dkblue","2,6":"dkblue","3,11":"dkblue","4,11":"dkblue","4,0":"dkblue","4,1":"dkblue","7,0":"dkblue","7,1":"dkblue","1,5":"dkblue","2,5":"dkblue","0,1":"dkblue","0,0":"dkblue","6,5":"dkblue","5,5":"dkblue"},
        folds: 3 },

        {start: {"2,8":"dkblue","2,7":"dkblue","2,4":"purple","3,8":"purple","2,6":"purple","2,5":"purple"},
        target: {"2,8":"dkblue","2,7":"dkblue","2,4":"purple","3,8":"purple","2,6":"purple","2,5":"purple","4,9":"purple","3,9":"purple","5,0":"dkblue","4,0":"dkblue","3,2":"purple","5,1":"purple","4,1":"purple","3,1":"purple","6,2":"purple","6,1":"purple","1,4":"dkblue","1,5":"dkblue","3,6":"purple","1,3":"purple","1,1":"purple","1,2":"purple","6,4":"dkblue","6,5":"dkblue","4,6":"purple","6,3":"purple","5,5":"purple","5,6":"purple"},
        folds: 3},
        
        {start: {"2,6":"dkblue","2,5":"dkblue","2,4":"green","2,7":"green"}, //hard
        target: {"2,6":"dkblue","2,5":"dkblue","2,4":"green","2,7":"green","4,1":"dkblue","3,1":"dkblue","3,2":"green","4,0":"green","1,2":"dkblue","1,3":"dkblue","2,3":"green","0,2":"green","4,2":"dkblue","4,3":"dkblue","3,3":"green","5,2":"green","3,6":"green","1,5":"green","5,5":"dkblue","5,6":"dkblue","4,6":"green","6,5":"green","3,9":"dkblue","3,8":"dkblue","3,7":"green","3,10":"green","5,4":"dkblue","4,4":"dkblue","4,5":"green","5,3":"green"},
        folds: 3},

        {start: {"6,4":"green","6,5":"green","5,5":"green","7,6":"red","6,6":"red","6,7":"red"}, //hard
        target: {"6,4":"green","6,5":"green","5,5":"green","7,6":"red","6,6":"red","6,7":"red","6,3":"green","7,5":"red","7,4":"red","7,3":"red","3,4":"green","3,5":"green","4,5":"green","2,6":"red","3,6":"red","3,7":"red","3,3":"green","2,5":"red","2,4":"red","2,3":"red","5,3":"green","5,4":"green","5,1":"red","5,2":"red","4,2":"red","6,1":"red","6,2":"red","7,2":"red","4,8":"green","4,7":"green","4,6":"green","3,8":"red","5,8":"green","3,9":"red","4,9":"red","4,10":"red"},
        folds: 3},

        {start: {"0,6":"green","0,7":"green","0,8":"purple","1,8":"purple"},
        target: {"0,6":"green","0,7":"green","0,8":"purple","1,8":"purple","1,4":"green","1,3":"green","2,3":"purple","2,4":"purple","2,1":"green","2,0":"green","3,0":"purple","3,1":"purple","1,5":"purple","2,5":"purple","7,6":"green","7,7":"green","7,8":"purple","6,8":"purple","6,4":"green","6,3":"green","5,3":"purple","5,4":"purple","5,1":"green","5,0":"green","4,0":"purple","4,1":"purple","6,5":"purple","5,5":"purple"},
        folds: 3},

        {start: {"5,2":"red","4,2":"red","4,3":"amber","5,1":"amber","4,4":"amber"},
        target: {"5,2":"red","4,2":"red","4,3":"amber","5,1":"amber","4,4":"amber","0,2":"red","1,2":"red","1,3":"amber","0,1":"amber","1,4":"amber","5,3":"red","5,4":"red","6,3":"amber","3,10":"red","3,9":"red","3,8":"amber","3,11":"amber","2,8":"amber","3,7":"red","3,6":"red","3,5":"amber","4,5":"amber","1,0":"red","1,1":"red","2,1":"amber","0,0":"amber","2,0":"amber","4,7":"red","4,6":"red","4,8":"amber","6,0":"red","6,1":"red","7,0":"amber","5,0":"amber"},
        folds: 3},

        {start: {"3,1":"dkblue","3,4":"green","3,3":"green","3,2":"green","3,0":"purple"},
        target: {"3,1":"dkblue","3,4":"green","3,3":"green","3,2":"green","3,0":"purple","2,1":"dkblue","2,4":"green","2,3":"green","2,2":"green","2,0":"purple","5,6":"dkblue","3,5":"green","4,5":"green","4,6":"green","5,7":"purple","4,8":"dkblue","3,6":"green","3,7":"green","4,7":"green","5,8":"purple","4,1":"dkblue","4,4":"green","4,3":"green","4,2":"green","4,0":"purple","5,1":"dkblue","5,4":"green","5,3":"green","5,2":"green","5,0":"purple","2,6":"dkblue","2,7":"purple","3,8":"dkblue","2,8":"purple"},
        folds: 3},

        {start: {"3,3":"dkblue","3,4":"dkblue","2,7":"dkblue","2,6":"dkblue","2,4":"dkblue","2,5":"dkblue"}, //hard
        target: {"3,3":"dkblue","3,4":"dkblue","2,7":"dkblue","2,6":"dkblue","2,4":"dkblue","2,5":"dkblue","4,0":"dkblue","4,1":"dkblue","3,2":"dkblue","3,1":"dkblue","4,3":"dkblue","4,4":"dkblue","5,7":"dkblue","5,6":"dkblue","5,4":"dkblue","5,5":"dkblue","3,0":"dkblue","4,2":"dkblue","6,3":"dkblue","6,4":"dkblue","7,7":"dkblue","7,6":"dkblue","7,4":"dkblue","7,5":"dkblue","5,0":"dkblue","5,1":"dkblue","6,2":"dkblue","6,1":"dkblue","5,3":"dkblue","4,7":"dkblue","4,6":"dkblue","4,5":"dkblue","6,0":"dkblue","5,2":"dkblue"},
        folds: 3},
        
        {start: {"7,8":"green","7,7":"green","7,3":"green","7,6":"red","7,4":"red","7,5":"red"}, //hard
        target: {"7,8":"green","7,7":"green","7,3":"green","7,6":"red","7,4":"red","7,5":"red","4,8":"green","4,7":"green","4,3":"green","4,6":"red","4,4":"red","4,5":"red","4,0":"green","5,0":"green","7,2":"green","5,1":"red","6,2":"red","6,1":"red","3,4":"green","3,5":"green","5,7":"green","5,6":"red","2,8":"green","2,7":"green","2,3":"green","2,6":"red","2,4":"red","2,5":"red","5,8":"green","5,3":"green","5,4":"red","5,5":"red","2,2":"green","4,1":"red","3,2":"red","3,1":"red","6,4":"green","6,5":"green"},
        folds: 3},

        {start: {"1,5":"green","2,7":"green","2,5":"purple","2,6":"purple"},
        target: {"1,5":"green","2,7":"green","2,5":"purple","2,6":"purple","3,10":"green","2,8":"green","3,9":"purple","3,8":"purple","3,0":"green","4,0":"green","3,1":"purple","4,1":"purple","6,0":"green","5,0":"green","6,1":"purple","5,1":"purple","6,5":"green","5,7":"green","5,5":"purple","5,6":"purple","4,10":"green","5,8":"green","4,9":"purple","4,8":"purple","1,0":"green","2,0":"green","1,1":"purple","2,1":"purple"},
        folds: 3},

],

}