#include <iostream>
#include "Graph.cpp"
#define FileDirection "E:\\GraphAmpTestValues.txt"
using namespace std;
/*
    
    Graph graph(6);
    graph.LoadFromFile(FileDirection);
    if(graph.AmplitudeSearch(4,1))
    {
        vector<int> aux=graph.GetSavedPath(1);
        for(int i=0;i<aux.size();i++)
        {
            cout<<aux[i]<<" ";
        }
    }
    cout<<endl;
    if(graph.DeepSearch(4,1))
    {
        vector<int> aux2=graph.GetSavedPath(1);
        for(int i=0;i<aux2.size();i++)
        {
            cout<<aux2[i]<<" ";
        }
    }
    cout<<"\n";
    graph.ShowGraph(funcToShowInt);
    */
void aux(pair<int,int>* var)
{
    cout<<var->first<<" ";
}
int main()
{
    Graph graph(6);
    graph.LoadFromFile(FileDirection);
    graph.ShowGraph(aux);
    /*
    if(graph.AmplitudeSearch(4,1))
    {
        cout<<"Busqueda en amplitud\n";
        vector<int> aux=graph.GetSavedPath(1);
        for(int i=0;i<aux.size();i++)
        {
            cout<<aux[i]<<" ";
        }
    }
    cout<<endl;
    if(graph.DeepSearch(4,1))
    {
        cout<<"Busqueda en profundidad\n";
        vector<int> aux2=graph.GetSavedPath(1);
        for(int i=0;i<aux2.size();i++)
        {
            cout<<aux2[i]<<" ";
        }
    }
    cout<<"\n";
    graph.AmplitudeSearchWotDestiny(4);
    graph.showPathsToOrigin(4);*/
    graph.Dijkstra(4);
    graph.showPathsToOriginWithValues(4);


    return 0;
}