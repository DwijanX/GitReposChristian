#include <iostream>
#include "BRTree.h"
#define FileDirection "E:\\100000Ordered.txt"
#define FileDirection1 "E:\\10000Nums.txt"
using namespace std;
void setconsolecolor(int textColor, int bgColor)
{
      SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), (textColor + (bgColor * 16)));
}
void FunToShowInt(int* aux)
{
    cout<<*aux<<" ";
}

int main()
{
    BRTree<int> Tree;
    setconsolecolor(0,15);
    /*Tree.insert(33);
    Tree.ShowTree(&FunToShowInt);
    Tree.insert(15);
    Tree.ShowTree(&FunToShowInt);

    Tree.insert(8);
    Tree.ShowTree(&FunToShowInt);

    Tree.insert(12);
    Tree.ShowTree(&FunToShowInt);

    Tree.insert(9);
    Tree.ShowTree(&FunToShowInt);

    Tree.insert(5);
    Tree.ShowTree(&FunToShowInt);

    Tree.insert(3);
    Tree.ShowTree(&FunToShowInt);

    Tree.insert(2);
    Tree.ShowTree(&FunToShowInt);*/
    Tree.insertFromFile(FileDirection1);
    cout<<"Altura:"<<Tree.getHeight()<<endl;
    if(Tree.verifyThatEachSonOfRedNodeIsBlack())
    {
        cout<<"Todos los hijos de rojos son negros\n";
    }
    else
    {
        cout<<"NO Todos los hijos de rojos son negros\n";
    }
    cout<<"Black Altura:"<<Tree.getBlackHeight()<<endl;
    cout<<"Nodos con un solo hijo: "<<Tree.CountNodesWOneSon()<<endl;
    return 0;
}