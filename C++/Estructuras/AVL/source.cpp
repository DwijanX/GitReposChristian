#include <iostream>
#include "AVL.h"
#include <set>
#include "timer.h"
#define FileDirection "E:\\100000Ordered.txt"
using namespace std;
void FunToShowInt(int* aux)
{
    cout<<*aux<<" ";
}

int main()
{
    timer reloj1,reloj2,reloj3,reloj4;
    AVL<int> Tree;
    set<int> Set;
    int aux;
    ifstream File;

    cout<<"Usando un archivo con 100 000 numeros ordenados\n";
    reloj1.start();
    Tree.insertFromFile(FileDirection);
    reloj1.stop();
    cout<<"Tiempo de insertar AVL"<<reloj1<<endl;

    reloj2.start();
    File.open(FileDirection);
    while (File>>aux)
    {
        Set.insert(aux);
    }
    reloj2.stop();
    cout<<"Tiempo de insertar Set"<<reloj2<<endl ;

    reloj3.start();
    for(int i=0;i<2500000;i++)
    {
        Tree.search(597);
        Tree.search(813);
        Tree.search(256);
        Tree.search(963);
    }
    reloj3.stop();
    cout<<"Tiempo de buscar 10 000 000 veces AVL"<<reloj3<<endl ;

    reloj4.start();
    for(int i=0;i<2500000;i++)
    {
        Set.find(597);
        Set.find(813);
        Set.find(256);
        Set.find(963);
    }
    reloj4.stop();
    cout<<"Tiempo de buscar 10 000 000 veces Set"<<reloj4<<endl ;

    return 0;
}