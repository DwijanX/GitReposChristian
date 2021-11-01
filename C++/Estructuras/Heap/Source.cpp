#include <iostream>
#include "Heap.h"
#define FileDirection1 "E:\\10000Nums.txt"
#include <map>

using namespace std;

void FunctionToShowInt(int aux)
{
    cout<<aux<<" ";
}
int main()
{/*
    Heap<int> heap(17000);
   
    heap.insertFromFile(FileDirection1);
    list<int> ans=heap.HeapSort();
    list<int>::iterator it;
    for(it=ans.begin();it!=ans.end();++it)
    {
        cout<<*it<<" ";
    }
*/
    /* heap.insert(85);
    heap.insert(55);
    heap.insert(70);
    heap.insert(33);
    heap.insert(54);
    heap.insert(68);
    //heap.ShowArray(FunctionToShowInt);
    cout<<endl;
    heap.insert(99);
    heap.ShowArray(FunctionToShowInt);
    cout<<endl;
    heap.extractRoot();
    heap.ShowArray(FunctionToShowInt);
    cout<<"\nMostrando InOrder\n";
    heap.ShowTree(FunctionToShowInt);*/
    map<string,map<int,int>> test;
    test["Luka"][2017]=70;
    test["Luka"][2018]=85;
    test["Carol"][2010]=90;
    cout<<test["Carol"][2010];
    return 0;
}
