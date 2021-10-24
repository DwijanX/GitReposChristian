#include <iostream>
#include "Heap.h"
using namespace std;

void FunctionToShowInt(int aux)
{
    cout<<aux<<" ";
}
int main()
{
    Heap<int> heap(100);
    heap.insert(85);
    heap.insert(55);
    heap.insert(70);
    heap.insert(33);
    heap.insert(54);
    heap.insert(68);
    heap.ShowArray(FunctionToShowInt);
    cout<<endl;
    heap.insert(99);
    heap.ShowArray(FunctionToShowInt);
    cout<<endl;
    heap.extractRoot();
    heap.ShowArray(FunctionToShowInt);
    
    cout<<"\nMostrando InOrder\n";
    heap.ShowTree(FunctionToShowInt);
    return 0;
}
