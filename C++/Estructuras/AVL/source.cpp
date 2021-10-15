#include <iostream>
#include "AVL.h"
using namespace std;
void FunToShowInt(int* aux)
{
    cout<<*aux<<" ";
}

int main()
{
    AVL<int> Tree;
    /*
    Tree.insert(18);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(12);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(20);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(11);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(16);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(14);
    Tree.ShowTree(&FunToShowInt);*/
    Tree.insert(20);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(15);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(30);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(25);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(32);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(24);
    Tree.ShowTree(&FunToShowInt);
    return 0;
}